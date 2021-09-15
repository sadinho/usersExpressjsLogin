import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
class AuthController {
    async authenticate(req: Request, res: Response ) {
        const respository = getRepository(User);
        const { email, password } = req.body;

        const userExists = await respository.findOne({ where: { email } });
        
        if (!userExists) {
            return res.sendStatus(401);
        }

        const isValidPassword = bcrypt.compare(password, userExists.password);
        
        if (!isValidPassword) {
            return res.sendStatus(401);
        }
       const token = jwt.sign({ id: userExists.id }, 'secret', {expiresIn: '1d'} );

       userExists.password = '';
       
       return res.json({
           userExists,
           token,
       })
    }
}

/* padrão singleton usando o new userController para sempre criar uma nova*/
export default new AuthController();