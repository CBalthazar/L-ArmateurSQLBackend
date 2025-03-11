import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

class UserRepository {
  async registerUser(pseudonym, mail, hash, description) {
    const id = uuidv4();
    let conn;
    try {
      conn = await pool.getConnection();
      return await conn.query(
        "INSERT INTO users VALUES (?,?,?,?,?) RETURNING id, pseudonym, mail, description",
        [id, pseudonym, mail, hash, description]
      );
    } catch (err) {
      console.log("repository");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getUserByMail(mail) {
    let conn;
    try {
      conn = await pool.getConnection();
      const [user] = await conn.query("SELECT * FROM users WHERE mail=?", [
        mail,
      ]);
      if (!user) throw new Error("user not in database");
      return user;
    } catch (err) {
      console.log("repo get user by mail");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getUserById(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const [user] = await conn.query("SELECT * FROM users WHERE id=?", [id]);
      if (!user) throw new Error("user not in database");
    } catch (err) {
      console.log("repo getUserById");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async getAllUsers() {
    let conn;
    try {
      conn = await pool.getConnection();
      const users = await conn.query(
        "SELECT pseudonym, description FROM Users"
      );
      return users;
    } catch (err) {
      console.log("repo get all users");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async updateUser(id, pseudonym, mail, password, description) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        "UPDATE Users SET pseudonym=?, mail=?, password=?, description=? WHERE id=?",
        [pseudonym, mail, password, description, id]
      );
      return await this.getUserById(id);
    } catch (err) {
      console.log("repository update user");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteUser(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM Users WHERE id=?", [id]);
    } catch (err) {
      console.log("repo delete user");
      console.error(err);
    } finally {
      if (conn) conn.release();
    }
  }
}
export default UserRepository;
