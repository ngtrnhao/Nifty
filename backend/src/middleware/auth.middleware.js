import jwt from 'jsonwebtoken';

export const authenticateToken = (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:"Không tìm thấy token"});
        }
        const token = authHeader.split('')[1];
        const decoded = jwt.verify(token.process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch(error){
        if(error.name=== 'TokenExpiredError'){
            return res.status(401).json({message:'Token đã hết hạn'});
        }
        res.status(401).json({message:'Token không hợp lệ'});
    }
}