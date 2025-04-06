export const generateToken = (user, message, statusCode, res)=>{
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + 6.1 * 60 * 60 * 1000),
        httpOnly: true
    }).json({
        success: true,
        message,
        user,
        token
    })

}