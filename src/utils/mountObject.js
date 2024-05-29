module.exports = class ArrToObject {
  constructor(list) {
    this.list = list;
  }

  get length() {
    return this.list.length;
  }

  get transformInObject() {
    const [header, ...rows] = this.list;
    const headerLower = header.map((item) => item.toLowerCase());
    const newRows = rows.map((row) => {
      return row.reduce((acc, value, index) => {
        acc[headerLower[index]] = value;
        return acc;
      }, {});
    });
    return JSON.stringify(newRows);
  }
}