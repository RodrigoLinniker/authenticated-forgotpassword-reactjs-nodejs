import { Request, Response } from "express";
import  prismaClient  from "../database/prismaClient";
import jwt from 'jsonwebtoken'
import dayjs from "dayjs";
import { sendResetEmail } from "../services/sendResetEmail";
import { hash } from "bcryptjs";

export class ForgotPasswordController{
  
    async forgotPassword(request:Request , response: Response){
        try{
            const {email} = request.body;
    
            const user = await prismaClient.user.findUnique({where: {email}});

            if(!user) {
                return response.status(404).send('User dont exists.');
            }

            const token = jwt.sign({ id: user.id }, `${process.env.RESET_SECRET}`, { expiresIn: '1h',  algorithm: 'HS256' });
            
            const expiresIn = dayjs().add(1, "hour").unix(); 
                await prismaClient.user.update({
                    where: { email },
                    data: { resetPasswordToken: token, resetPasswordTokenExpiry: expiresIn},
                })

          
            sendResetEmail(user.email, token);

            return response.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' })
           
        } catch(err){
            return response.status(500).json({ message: 'Erro ao enviar e-mail de redefinição de senha' }) 
        } 
    }

    async verify(request:Request , response: Response){
        const {token} = request.params
       
       try {
        const decoded = jwt.verify(token, `${process.env.RESET_SECRET}`) as any;
        
           const user = await prismaClient.user.findUnique({ where: { id: decoded.id } });
           
             if (!user) {
            return response.status(404).send({ message: 'Token inválido' });
            } 
            return response.status(200).json({ email: user?.email });

        } catch (error) {
            return response.status(400).send({ message: 'Token inválido ou expirado2' });
        }
    }

    async resetPassword(request:Request , response: Response){
        try {
            // Obtém os dados do corpo da solicitação
            const { token, password, passwordConfirm } = request.body
        
            // Verifica se o token é válido
            const { id } = jwt.verify(token, `${process.env.RESET_SECRET}`) as { id: string }

            if(password !== passwordConfirm){
                return response.status(404).send('Password are different');
            }

            const passwordHash = await hash(password, 8);
           
             await prismaClient.user.update({
              where: { id },
              data: { password: passwordHash },
            }) 

            return response.json({ message: 'Senha redefinida com sucesso' })
        } catch (err) {
            return response.status(400).json({ message: 'Token inválido ou expirado' })
        }
    }
       
}