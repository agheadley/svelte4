import * as initial from "./initial";

let status = {
  version: "version1",
  dept: "CHE"
};

let version = {
  version1: {
    name: "v1",
    core: {},
    data: []
  },
  version2: {
    name: "v2",
    core: {},
    data: []
  },
  version3: {
    name: "v3",
    core: {},
    data: []
  },
  version4: {
    name: "v4",
    core: {},
    data: []
  },
  version5: {
    name: "v5",
    core: {},
    data: []
  }
};

/* gets version from local storage */
let getVersion = (versionKey) => {
  version[versionKey] = JSON.parse(localStorage.getItem(versionKey));
};

/* puts core, data into version storage */
let putVersion = () => {
  localStorage.setItem(status.version, JSON.stringify(version[status.version]));
};

/* exported functions ... */

/* update setings, one at a time */
let updateCore = (key, value) => {
  version[status.version].core[key] = value;
  putVersion();
};

/* add a blank row */
let addRow = (year) => {
  let row = JSON.parse(JSON.stringify(version[status.version].core.row));
  console.log("adding year ", year);

  let newIndex = version[status.version].core.yearList.indexOf(year);

  let pos = 0;
  let flag = true;
  for (let item of version[status.version].data) {
    //let dataIndex = core.yearList.indexOf(item.y);
    let dataIndex = version[status.version].core.yearList.indexOf(item.y);
    console.log(dataIndex, newIndex);
    if (flag) {
      if (dataIndex > newIndex) {
        pos = version[status.version].data.indexOf(item);
        console.log("adding @", pos);
        flag = false;
      }
    }
  }
  if (flag) {
    console.log("pushing to end");
    version[status.version].data.push({ y: year, row: row });
  } else {
    version[status.version].data.splice(pos, 0, { y: year, row: row });
  }

  putVersion();
};

let deleteRow = (index) => {
  version[status.version].data.splice(index, 1);
  putVersion();
};

/* rowObj {i:data.length,y:year,row:row[]} */
let putRow = (row, rowObj) => {
  version[status.version].data[row] = rowObj;
  putVersion();
};

let putName = (versionKey, nameVal) => {
  version[versionKey].name = nameVal;
};

/* changes active version, brings core / data from local storage */
let updateVersion = (versionKey) => {
  status.version = versionKey;
  status.versionName = version[versionKey].name;
  localStorage.setItem("active", status.version);
  getVersion(versionKey);
};

/* look for previous version stored, and load, otherwise, load 1st version */
let initVersion = () => {
  for (let key of Object.keys(version)) {
    if (localStorage.getItem(key) === null) {
      version[key].data = [];
      version[key].core = JSON.parse(JSON.stringify(initial.core));
      localStorage.setItem(key, JSON.stringify(version[key]));
    }
  }

  if (localStorage.getItem("active") === null) {
    let keys = Object.keys(version);
    localStorage.setItem("active", keys[0]);
    status.version = "version1";
  } else {
    status.version = localStorage.getItem("active");
  }
  updateVersion(status.version);
};

let getData = () => {
  return version[status.version].data;
};

let getCore = () => {
  return version[status.version].core;
};

let getStatus = () => {
  return status;
};

let getVersionObj = () => {
  return version;
};

let deleteData = (versionKey) => {
  version[versionKey].data = [];
};

export {
  getCore,
  getData,
  getStatus,
  updateCore,
  addRow,
  deleteRow,
  putRow,
  initVersion,
  updateVersion,
  getVersionObj,
  deleteData,
  putName
};
