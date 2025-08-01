import jwt from 'jsonwebtoken';


const isAuthenticated = async (req,res,next) =>{
    try {
        const token = req.cookies.token; //get token from browser 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"You are not authenticated"
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"You are not authenticated",
                success:false
            })
        }

        req.id = decode.userId; //set user id in request
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}

export default isAuthenticated;