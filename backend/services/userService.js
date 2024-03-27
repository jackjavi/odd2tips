const User = require("../models/User");

class UserService {
  async createUser(email, password, name, profilePicture) {
    const user = new User({ email, password, name, profilePicture });
    await user.save();
    return user;
  }

  async findUserByEmail(email) {
    return User.findOne({ email });
  }
}

module.exports = new UserService();
