import jwt from 'jsonwebtoken'
import configEnv from "./configEnv";

const generateToken=async(username)=>{
    const token=await jwt.sign(
        {username},
        process.env.TOKEN_SECRET,{
            expiresIn:'55m'
        }
    )
    return token;
}

export default generateToken;