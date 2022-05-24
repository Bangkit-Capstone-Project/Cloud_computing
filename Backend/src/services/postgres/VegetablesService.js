const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapVegetableDBtoModel } = require('../../utils');

class VegetablesService {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this._pool = new Pool({
        connectionString: process.env.PGURI,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    } else {
      this._pool = new Pool();
    }
  }

  async getVegetables() {
    const result = await this._pool.query('SELECT id, name, description, image_url FROM vegetables');
    return result.rows.map(mapVegetableDBtoModel);
  }

  async getVegetableById(id) {
    const result = await this._pool.query('SELECT * FROM vegetables WHERE id = $1', [id]);

    if (!result.rows.length) {
      throw new NotFoundError('Vegetable tidak ditemukan');
    }

    return result.rows.map(mapVegetableDBtoModel)[0];
  }

  async addVegetable({ name, description, imageUrl }) {
    const id = `vegetable-${nanoid(16)}`;
    const query = {
      text:'INSERT INTO vegetables VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, description, imageUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Vegetable gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async editVegetableById(id, { name, description, imageUrl }) {
   const query = {
      text: 'UPDATE vegetables SET name = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING id',
      values: [name, description, imageUrl, id],
   };

   const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Vegetable gagal diedit');
    }
  }

  async deleteVegetableById(id){
    const query = {
      text: 'DELETE FROM vegetables WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Vegetable gagal dihapus');
    }
  }
}

module.exports = VegetablesService;