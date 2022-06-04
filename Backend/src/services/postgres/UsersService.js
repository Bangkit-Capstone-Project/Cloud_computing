/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
 
class UsersService {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this._pool = new Pool({
        "host":process.env.PGHOST,
        "database":process.env.PGDATABASE,
        "port":"5432",
        "user":process.env.PGUSER,
        "password":process.env.PGPASSWORD
      });
    } else {
      this._pool = new Pool();
    }
  }

  async addUser({
    email, username, password, fullname, profile_pic_url = 'https://storage.googleapis.com/playtico-0123.appspot.com/16497835433630ef32f2605448f80a48f7257415cb116.jpg',
  }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $7) RETURNING id',
      values: [id, email, username, hashedPassword, fullname, profile_pic_url, created_at],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async updateProfilePicture(profilePicture, userId) {
    const query = {
      text: 'UPDATE users SET profile_pic_url = $1 WHERE id = $2 RETURNING id',
      values: [profilePicture, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new InvariantError('Gagal mengupdate profil picture');
    }
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, email, username, fullname, profile_pic_url FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async getUsersByUsername(username) {
    const query = {
      text: 'SELECT id, username, fullname, profile_pic_url FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }
    
    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
