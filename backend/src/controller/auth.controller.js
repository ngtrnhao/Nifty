import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';

class AuthController {
    async register(req,res){
        try{
            const {email,password,name} = req.body;
            const existingUser = await 
        }
    }
}
