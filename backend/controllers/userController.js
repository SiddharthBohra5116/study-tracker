const User = require("../models/User");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/dashboard");
    });
  } catch (error) {
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  res.redirect("/dashboard");
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};
