import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            console.log(token);

            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                console.log(decodedToken);
                req.body._id = decodedToken?.id;
            }
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: "Unauthorized access" });
    }
};

export default authMiddleware;
