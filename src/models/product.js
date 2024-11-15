const db = require('../database');

class Product {
  static create(product) {
    return new Promise((resolve, reject) => {
      const { name, description, price, stock } = product;
      db.run(
        'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
        [name, description, price, stock],
        function (err) {
          if (err) reject(err);
          resolve({ id: this.lastID, ...product });
        }
      );
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static update(id, updates) {
    const { name, description, price, stock } = updates;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, description, price, stock, id],
        function (err) {
          if (err) reject(err);
          resolve({ changes: this.changes });
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Product;