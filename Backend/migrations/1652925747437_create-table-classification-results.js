/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('classification_results', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    vegetable_id: {
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

  pgm.addConstraint('classification_results', 'user_id_fkey', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('classification_results', 'vegetable_id_fkey', 'FOREIGN KEY (vegetable_id) REFERENCES vegetables(id) ON DELETE RESTRICT');
};

exports.down = pgm => {
  pgm.dropTable('classification_results');
};
