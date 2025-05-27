export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        console.log("Authenticated user:", req.user);

      return res.status(403).json({ success: false, message: 'Admin access only.' });
    }
    next();
  };