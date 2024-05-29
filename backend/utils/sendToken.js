// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    // Convert COOKIE_EXPIRE to milliseconds (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10);
    const cookieExpireMs = cookieExpireDays * 24 * 60 * 60 * 1000;
  
    // options for cookie
    const options = {
      expires: new Date(Date.now() + cookieExpireMs),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;
  