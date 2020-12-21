/* cretae 2d array for export (headers in first row) */
let createExport = (data, row, exportType) => {
  console.log(exportType);
  console.log(row);
  console.log(data);

  let arr2d = [];
  arr2d[0] = [exportType.toUpperCase(), "(count)", "(type)"];
  for (let col of row) arr2d[0].push(col.d + col.p + "/" + col.w);
  for (let item of data) {
    let line = [item.name, item.count, "CLASS"];
    for (let col of item.row) {
      line.push(col.c);
    }
    arr2d.push(line);
    line = [item.name, item.count, "STAFF"];
    for (let col of item.row) {
      line.push(col.s);
    }
    arr2d.push(line);
    line = [item.name, item.count, "ROOM"];
    for (let col of item.row) {
      line.push(col.r);
    }
    arr2d.push(line);
  }
  return arr2d;
};

export { createExport };
