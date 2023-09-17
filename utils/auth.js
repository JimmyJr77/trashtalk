const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
      return res.status(401).json({ error: 'Not authenticated' }); 
  }
  next();
};

module.exports = withAuth;
  