import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ProtectedRequest extends Request {
    user?: JwtPayload; 
}

export const authMiddleware = (req: ProtectedRequest, res: Response, next: NextFunction) => {

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};