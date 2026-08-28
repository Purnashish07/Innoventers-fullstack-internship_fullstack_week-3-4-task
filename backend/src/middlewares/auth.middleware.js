const jwt = require('jsonwebtoken');
exports.protect = (req,res,next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({success:false, message:'No token'});
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch { return res.status(401).json({success:false, message:'Invalid token'}); }
};
exports.authorize = (...roles) => (req,res,next) => {
  if(!roles.includes(req.user.role)) return res.status(403).json({success:false, message:'Forbidden'});
  next();
};
