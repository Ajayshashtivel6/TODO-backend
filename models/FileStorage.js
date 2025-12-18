const fs = require('fs');
const path = require('path');

class FileStorage {
  constructor(filename) {
    this.filepath = path.join(__dirname, '../db', filename);
  }

  read() {
    try {
      const data = fs.readFileSync(this.filepath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filepath, JSON.stringify(data, null, 2));
  }

  findOne(query) {
    const data = this.read();
    return data.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  find(query = {}) {
    const data = this.read();
    if (Object.keys(query).length === 0) return data;
    return data.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  create(item) {
    const data = this.read();
    const newItem = { ...item, _id: Date.now().toString() };
    data.push(newItem);
    this.write(data);
    return newItem;
  }

  update(id, updates) {
    const data = this.read();
    const index = data.findIndex(item => item._id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      this.write(data);
      return data[index];
    }
    return null;
  }

  delete(id) {
    const data = this.read();
    const filtered = data.filter(item => item._id !== id);
    this.write(filtered);
    return filtered.length < data.length;
  }
}

module.exports = FileStorage;