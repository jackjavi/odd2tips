exports.checkAuth = (req, res) => {
  res.json({ token: req.cookies.token, isAuthenticated: true });
};
