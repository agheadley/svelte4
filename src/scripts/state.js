import * as initial from "./initial";

let version = {
  active: "version1",
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
let getVersion = (versionKey = version.active) => {
  version[versionKey] = JSON.parse(localStorage.getItem(versionKey));
  return version[versionKey];
};

/* puts core, data into version storage */
let putVersion = (versionKey = version.active, versionValue = false) => {
  if (!versionValue) {
    localStorage.setItem(versionKey, JSON.stringify(version[versionKey]));
  } else {
    localStorage.setItem(versionKey, JSON.stringify(versionValue));
    version.versionKey = versionValue;
  }
};

/* add a blank row */
let addRow = (year, versionKey = version.active) => {
  let row = JSON.parse(JSON.stringify(version[version.active].core.row));
  console.log("adding year ", year);

  let newIndex = version[versionKey].core.yearList.indexOf(year);

  let pos = 0;
  let flag = true;
  for (let item of version[version.active].data) {
    //let dataIndex = core.yearList.indexOf(item.y);
    let dataIndex = version[version.active].core.yearList.indexOf(item.y);
    console.log(dataIndex, newIndex);
    if (flag) {
      if (dataIndex > newIndex) {
        pos = version[version.active].data.indexOf(item);
        console.log("adding @", pos);
        flag = false;
      }
    }
  }
  if (flag) {
    console.log("pushing to end");
    version[version.active].data.push({ y: year, row: row });
  } else {
    version[version.active].data.splice(pos, 0, { y: year, row: row });
  }

  putVersion();
};

let deleteRow = (index, versionKey = version.active) => {
  version[version.active].data.splice(index, 1);
  putVersion();
};

/* rowObj {i:data.length,y:year,row:row[]} */
let putRow = (row, rowObj, versionKey = version.active) => {
  version[version.active].data[row] = rowObj;
  putVersion();
};

let initVersion = (versionKey = version.active) => {
  if (localStorage.getItem(versionKey) === null) {
    version[versionKey].data = [];
    version[versionKey].core = JSON.parse(JSON.stringify(initial.core));
    putVersion(versionKey);
  }
};

let deleteData = (versionKey = version.active) => {
  version[versionKey].data = [];
  putVersion(versionKey);
};

let getVersionKeys = () => {
  let keys = Object.keys(version);
  keys = keys.filter((el) => el !== "active");
  return keys;
};

let getActive = () => {
  if (localStorage.getItem("active") === null) return false;
  else return version.active;
};

let setActive = (versionKey) => {
  version.active = versionKey;
  localStorage.setItem("active", version.active);
};

export {
  getVersion,
  putVersion,
  addRow,
  deleteRow,
  putRow,
  initVersion,
  deleteData,
  getVersionKeys,
  getActive,
  setActive
};
