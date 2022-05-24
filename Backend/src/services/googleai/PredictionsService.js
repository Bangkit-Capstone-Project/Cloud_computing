const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapPredictionsDBtoModel } = require('../../utils');

class PredictionsService{
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

  async getRicePrediction(file, meta){
    const created_at = new Date().toISOString();
    const result = {
      image_url: `https://storage.googleapis.com/tanaminapp-images/ssss`,
      accuracy: 0.8,
      plant_name: "Rice",
      diseases_name: "Nama penyakit",
      description: "ini description dummy",
      created_at: created_at
    };

    return mapPredictionsDBtoModel(result);
  }

  async getCassavaPrediction(file, meta){
    const created_at = new Date().toISOString();
    const result = {
      image_url: `https://storage.googleapis.com/tanaminapp-images/ssss`,
      accuracy: 0.8,
      plant_name: "Cassava",
      diseases_name: "Nama penyakit",
      description: "ini description dummy",
      created_at: created_at
    };

    return mapPredictionsDBtoModel(result);
  }
}

module.exports = PredictionsService;