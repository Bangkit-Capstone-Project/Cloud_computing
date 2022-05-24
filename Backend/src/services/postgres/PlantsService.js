const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapPlantDBtoModel } = require("../../utils");

class PlantsService {
  constructor() {
    if (process.env.NODE_ENV === "production") {
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

  async getPlants() {
    const result = await this._pool.query(
      "SELECT id, name, description, image_url FROM plants"
    );
    return result.rows.map(mapPlantDBtoModel);
  }

  async getPlantById(id) {
    const result = await this._pool.query(
      "SELECT * FROM plants WHERE id = $1",
      [id]
    );

    if (!result.rows.length) {
      throw new NotFoundError("Plant tidak ditemukan");
    }

    return result.rows.map(mapPlantDBtoModel)[0];
  }

  async addPlant({ name, description, imageUrl }) {
    const id = `plant-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO plants VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, name, description, imageUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Plant gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async editPlantById(id, { name, description, imageUrl }) {
    const query = {
      text: "UPDATE plants SET name = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING id",
      values: [name, description, imageUrl, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Plant gagal diedit");
    }
  }

  async deletePlantById(id) {
    const query = {
      text: "DELETE FROM plants WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Plant gagal dihapus");
    }
  }
}

module.exports = PlantsService;
