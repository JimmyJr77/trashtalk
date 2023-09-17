const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
      return res.status(401).json({ error: 'Not authenticated' }); 
  }
  next();
};

module.exports = withAuth;
  