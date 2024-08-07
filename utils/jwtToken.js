export const sendToken = (user, statusCode, message, res) => {
  const token = user.getJWTToken();
  const options = {
    // expiresIn: new Date(
    //   Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
    // ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    partitioned: true,
    maxAge: 604800000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};
