exports.googleAuth = async (req, res) => {
  try {
    passport.authenticate("google", { failureRedirect: "/error" }),
      function (req, res) {
        // Successful authentication, redirect success.
        res.redirect("/success");
      };
    res.status(201).json(googleAuth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
