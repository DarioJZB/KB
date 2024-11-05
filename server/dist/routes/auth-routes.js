import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username },
        });
        if (!user) {
            return res.status(401).json({ message: "Athentication Failed" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Athentication Failed" });
        }
        const secretKey = process.env.JWT_SECRET_KEY || "";
        if (!secretKey) {
            return res.status(500).json({ message: "JWT Secrfet key not configured" });
        }
        const token = jwt.sign({ username: user.username, id: user.id }, secretKey, { expiresIn: "1h" });
        return res.json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
