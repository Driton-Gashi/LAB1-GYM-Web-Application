const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const pool = new Pool({
  connectionString: "postgres://postgres:dritoni@localhost:5432/lmao_database",
});

class User {
  constructor(
    user_id,
    user_name,
    password,
    email,
    role,
    has_subscription,
    image,
    address,
    tel
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.password = password;
    this.email = email;
    if (role !== null || role !== undefined) {
      this.role = role;
    } else {
      this.role = "user";
    }
    this.has_subscription = has_subscription;
    this.image = image;
    this.address = address;
    this.tel = tel;
  }

  static async findByUserName(user_name) {
    const query = {
      text: "SELECT * FROM users WHERE user_name = $1",
      values: [user_name],
    };
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return null;
    }
    const userRow = rows[0];
    return new User(
      userRow.user_id,
      userRow.user_name,
      userRow.password,
      userRow.email,
      userRow.role
    );
  }

  static async findOne({ email }) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return null;
    }
    const userRow = rows[0];
    return new User(
      userRow.user_id,
      userRow.user_name,
      userRow.password,
      userRow.email,
      userRow.role,
      userRow.has_subscription,
      userRow.image,
      userRow.address,
      userRow.tel_number
    );
  }

  async emailExists({ email }) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const { rows } = await pool.query(query);
    if (rows.length > 0) {
      throw new Error("A user already exists with this email!");
    }
    const message = "A user already exists with this email!";
    res.send({ message });
  }

  async save() {
    const saltRounds = 10;
    if (!this.password) {
      throw new Error("Password is required");
    }

    const hash = await bcrypt.hash(this.password, saltRounds);
    const query = {
      text: "INSERT INTO users(user_name, password, email, role) VALUES($1, $2, $3, $4) RETURNING user_id",
      values: [this.user_name, hash, this.email, this.role],
    };
    const { rows } = await pool.query(query);
    this.user_id = rows[0].user_id;
    return this;
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
