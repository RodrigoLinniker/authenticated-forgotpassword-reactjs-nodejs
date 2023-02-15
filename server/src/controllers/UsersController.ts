import { Request , Response } from 'express';
import prismaClient from '../database/prismaClient';
import { hash } from 'bcryptjs';

export class UsersController{
    async create (request: Request, response: Response){
        try{
            const {email, password, confirmPassword} = request.body;

            const existingUser = await prismaClient.user.findUnique({where: {email}});
    
            if (existingUser) {
                return response.status(404).send('User exists.');
            }

            if(password != confirmPassword){
                return response.status(400).send('Passwords are different')
            }
    
            const passwordHash = await hash(password, 8);
    
            const createUser = await prismaClient.user.create({
                data:{
                    email,
                    password: passwordHash
                }
              });
    
            return response.send({
                message: `Created new user: ${createUser.email} (ID: ${createUser.id})`,
            })
        } catch(error){
            return response.status(500).send({
                error: 'An error occurred while creating the user',
            })
        }
        
    }
}