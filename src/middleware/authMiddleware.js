import jwt from "jsonwebtoken";

// Verify JWT and inject user data into the request
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            success: false,
            message: "Token failed",
        });
    }
};

// Role-based authorization
export const authorize = (...roles) => {
    return (req, res, next) => {
        console.log("Allowed Roles:", roles);
        console.log("Current User:", req.user);

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not authorized for this route`,
            });
        }

        next();
    };
};