exports.checkAuth = (req, res) => {
  console.log("req.cookies.token", req.cookies.token, "req.user", req.user);
  res.json({
    token: req.cookies.token,
    isAuthenticated: true,
    user: req.user,
  });
};
