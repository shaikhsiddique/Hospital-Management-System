import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();


export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return next(new ErrorHandler("Admin not authenticated!", 400));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new ErrorHandler("Json Web Token is Expired, Try Again!", 400));
        }
        return next(new ErrorHandler("Invalid Token, Please login again!", 400));
    }

    req.user = await User.findById(decoded.id);

    if (!req.user || req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user?.role || "User"} not authorized for this resource!`, 403));
    }

    next();
});


export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new ErrorHandler("Please log in to continue!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user || req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user?.role || "User"} not authorized for this resource!`, 403));
    }

    next();
});
