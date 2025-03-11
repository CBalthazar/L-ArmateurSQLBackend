import UserRepository from "../repositories/repositoryUser.js";
import argon2 from "argon2";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(pseudonym, mail, password, description) {
    try {
      const hash = await argon2.hash(password);
      return await this.userRepository.registerUser(
        pseudonym,
        mail,
        hash,
        description
      );
    } catch (err) {
      console.log("service");
      console.error(err);
    }
  }

  async loginUser(mail, password) {
    try {
      const user = await this.userRepository.getUserByMail(mail);
      if (!user || !(await argon2.verify(user.password, password))) {
        throw new Error("User Missing or password Wrong");
      }
      return user;
    } catch (err) {
      console.log("service login:");
      console.error(err);
    }
  }

  async getUserById(id) {
    try {
      return await this.userRepository.getUserById(id);
    } catch (err) {
      console.log("service getUserById");
      console.error(err);
    }
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(id, pseudonym, mail, password, description) {
    try {
      const hash = await argon2.hash(password);
      return await this.updateUser(id, pseudonym, mail, hash, description);
    } catch (err) {
      console.log("service update user");
      console.error(err);
    }
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;
