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
    }
  }
}
export default UserRepository;
