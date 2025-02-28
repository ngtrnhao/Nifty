import {pool} from "../config/db.js";
import bcrypt from "bcrypt";

class UserModel { 
    async createUser(userData){
        const {username,email,password,full_name} = userData;
        const hashedPassword = await bcrypt.hash(password,10);
        const query = `
        INSERT INTO users  (username, email, password, full_name,is_verified,is_active,create_at,update_at
        )
        VALUE($1, $2, $3,$4,$5,false,true, NOW(),NOW())
        RETURNING id,username,email,full_name
        `;

        const values = [username,email,hashedPassword,full_name];
        const result = await pool.query(query,values);
        return result.rows[0];
        
    }
    async findByEmail(email){
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query,[email]);
        return result.rows[0];
    }
}
export default UserModel;
