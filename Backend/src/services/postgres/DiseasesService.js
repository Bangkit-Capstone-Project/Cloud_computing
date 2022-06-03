const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDiseaseDBtoModel } = require('../../utils');

class DiseasesService {
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

  async getDiseases() {
    const result = await this._pool.query('SELECT id, name, description, image_url FROM diseases');
    return result.rows.map(mapDiseaseDBtoModel);
  }

  async getDiseaseById(id) {
    const result = await this._pool.query('SELECT * FROM diseases WHERE id = $1', [id]);

    if (!result.rows.length) {
      throw new NotFoundError('Disease tidak ditemukan');
    }

    return result.rows.map(mapDiseaseDBtoModel)[0];
  }

  async addDisease({ name, description, imageUrl }) {
    const id = `disease-${nanoid(16)}`;
    const query = {
      text:'INSERT INTO diseases VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, description, imageUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Disease gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async editDiseaseById(id, { name, description, imageUrl }) {
   const query = {
      text: 'UPDATE diseases SET name = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING id',
      values: [name, description, imageUrl, id],
   };

   const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Disease gagal diedit');
    }
  }

  async deleteDiseaseById(id){
    const query = {
      text: 'DELETE FROM diseases WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Disease gagal dihapus');
    }
  }
}

module.exports = DiseasesService;