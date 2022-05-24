const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapPredictHistoryDBtoModel } = require("../../utils");


class HistorysService {
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

  async addPredictionHistorys(
    plantId,
    diseaseId,
    credentialsId,
    accuracy,
    imageUrl,
    ) {
    const id = `predictionhistory-${nanoid(16)}`;
    const created_at = new Date().toISOString();

    const query = {
      text: 'INSERT INTO predict_results VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, credentialsId, plantId, diseaseId, accuracy, imageUrl, created_at],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('History gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPredictionHistorys(credentialsId) {
    const query = {
      text: 'SELECT id, plant_id, disease_id, accuracy, image_url, created_at FROM predict_results WHERE user_id = $1',
      values: [credentialsId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('User tidak memiliki history');
    }
    return result.rows.map(mapPredictHistoryDBtoModel);
  }

  async getPredictionHistorysByPlantId(plantId, credentialsId) {
    const query = {
      text: 'SELECT id, plant_id, disease_id, accuracy, image_url, created_at FROM predict_results WHERE plant_id = $1 AND user_id = $2',
      values: [plantId, credentialsId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('History tidak ditemukan');
    }
    return result.rows.map(mapPredictHistoryDBtoModel);
  }

  async getPredictionHistorysByPlantIdDiseaseId(plantId, diseaseId, credentialsId){
    const query = {
      text: 'SELECT id, plant_id, disease_id, accuracy, image_url, created_at FROM predict_results WHERE plant_id = $1 AND disease_id = $2 AND user_id = $3',
      values: [plantId, diseaseId, credentialsId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('History tidak ditemukan');
    }
    return result.rows.map(mapPredictHistoryDBtoModel);
  }

 async getPredictionHistoryById(id){
    const query = {
      text: 'SELECT id, user_id, plant_id, disease_id, accuracy, image_url, created_at FROM predict_results WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('History tidak ditemukan');
    }
    return result.rows.map(mapPredictHistoryDBtoModel);
  }

  async deletePredictionHistoryById(id){
    const query = {
      text: 'DELETE FROM predict_results WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('History tidak ditemukan');
    }
    return result.rows.map(mapPredictHistoryDBtoModel);
  }
}

module.exports = HistorysService;