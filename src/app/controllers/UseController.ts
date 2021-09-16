import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userID: req.userId });
    }
    async store(req: Request, res: Response ) {
        const respository = getRepository(User);
        const { email, password } = req.body;

        if (!email || !password){
            return res.sendStatus(422);
        }
        const userExists = await respository.findOne({ where: { email } });
        
        if (userExists) {
            return res.sendStatus(409);
        }

        const user = respository.create({
            email,
            password,
        })
        await respository.save(user);

        return res.json(user);
    }
}

/* padrão singleton usando o new userController para sempre criar uma nova*/
export default new UserController();