import { Request, Response } from "express";
import  prismaClient  from "../database/prismaClient";
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import dayjs from "dayjs"

export class SessionsController{
    
    async create(request:Request , response: Response){
        const { email, password } = request.body;

        const existingUser = await prismaClient.user.findUnique({
          select: {
            id: true,
            email: true,
            resetPasswordToken: true,
            resetPasswordTokenExpiry: true,
            createdAt: true,
            updatedAt: true,
        },
          where: {email}
        });

        const userPassword = await prismaClient.user.findUnique({where: {email}});

        if (!existingUser || !userPassword) {
          return response.status(404).send('User dont exists.');
          }
       
        const compareSenha = await compare(password, userPassword.password);
       
        if (!compareSenha) {
            return response.status(401).send('Invalid login credentials.');  
        }  

        const token = jwt.sign({ userId: existingUser?.id, expiresIn: '30d' }, `${process.env.JWT_ACCESS_SECRET}`, {
            
          });
        const expiresIn = dayjs().add(30, "days").unix(); 
        
          
        return response.json({existingUser, token, expiresIn })
   
    }
}

export default {SessionsController};