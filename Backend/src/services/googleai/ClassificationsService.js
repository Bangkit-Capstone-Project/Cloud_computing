const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapClassificationsDBtoModel } = require('../../utils');

class ClassificationsService{
  constructor(collaborationsService) {
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
    this._collaborationsService = collaborationsService;
  }

  async getClassification(file, meta){
    const created_at = new Date().toISOString();
    const result = {
      image_url: `https://storage.googleapis.com/tanaminapp-images/ssss`,
      accuracy: 0.8,
      name: "pohon",
      description: "ini description dummy",
      created_at: created_at
    };

    return mapClassificationsDBtoModel(result);
  }
}

module.exports = ClassificationsService;