import axios from 'axios';

class DB {
  static table(path, tableName) {
    return new Table(path, tableName);
  }
}

class Table {
  constructor(path, tableName) {
    this.path = path;
    this.tableName = tableName;
    this.query = '';
    this.method = '';
  }
  get() {
    this.query += `SELECT * FROM ${this.tableName} `;
    this.method = 'get';
    return this;
  }
  where(column, value) {
    this.query += `WHERE ${column} = '${value}' `;
    return this;
  }
  log() {
    console.log(this.query, this.path);
    return this.query;
  }
  makeRequest() {
    return axios[this.method](`${this.path}?query=${this.query}`);
  }
}

export default DB;
