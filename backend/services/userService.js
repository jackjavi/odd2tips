const User = require("../models/User");

class UserService {
  async createUser(email, password) {
    const user = new User({ email, password });
    await user.save();
    return user;
  }

  async findUserByEmail(email) {
    return User.findOne({ email });
  }
}

module.exports = new UserService();
