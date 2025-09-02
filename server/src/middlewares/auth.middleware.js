import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Unauthorized Request" });

        const token = req.headers.authorization.split(" ")[1];

        if (!token) return res.status(401).json({ error: "Unauthorized Request" });

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) return res.status(401).json({ error: "Unauthorized Request" });

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
}

