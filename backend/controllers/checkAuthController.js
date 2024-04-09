exports.checkAuth = (req, res) => {
  res.json({ user: req.user, isAuthenticated: true });
};
