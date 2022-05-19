/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('predict_results', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    plant_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    disease_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    accuracy: {
      type: 'NUMERIC',
      notNull: true,
    },
    image_url: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('predict_results', 'user_id_fkey', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('predict_results', 'plant_id_fkey', 'FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE RESTRICT');
  pgm.addConstraint('predict_results', 'disease_id_fkey', 'FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE RESTRICT');
};

exports.down = pgm => {
  pgm.dropTable('predict_results');
};
