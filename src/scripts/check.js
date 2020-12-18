import * as state from "./state";

let updateErrors = (col) => {
  let data = state.getVersion().data;

  /* replace all errors for column */
  for (let row of data) {
    row.row[col].e = "";
  }

  /* add staff errors */

  for (let row of data) {
    console.log(row.y, row.row[col].s, row.row[col].r, row.row[col].e);

    let staffCheck = data
      .map((el, i) =>
        el.row[col].s === row.row[col].s && el.row[col].s !== "" ? i : -1
      )
      .filter((index) => index !== -1);

    console.log(row.row[col].s, staffCheck);

    if (staffCheck.length > 1) {
      for (let index of staffCheck) {
        if (data[index].row[col].e.indexOf("S") === -1)
          data[index].row[col].e += "S";
      }
    }
  }

  /* add room errors */

  for (let row of data) {
    console.log(row.y, row.row[col].s, row.row[col].r, row.row[col].e);

    let roomCheck = data
      .map((el, i) =>
        el.row[col].r === row.row[col].r && el.row[col].r !== "" ? i : -1
      )
      .filter((index) => index !== -1);

    console.log(row.row[col].r, roomCheck);

    if (roomCheck.length > 1) {
      for (let index of roomCheck) {
        if (data[index].row[col].e.indexOf("R") === -1)
          data[index].row[col].e += "R";
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    state.putRow(i, data[i]);
  }
};

let checkInput = (value) => {
  console.log("check.checkInput():");
  let flag = { class: false, staff: false, room: false };

  flag.class = checkClass(value.class);
  flag.staff = checkStaff(value.staff);
  flag.room = checkRoom(value.room);

  return flag;
};

let checkStaff = (val) => {
  val = val.replace(" ", "").toUpperCase();

  if (val === "") return false;

  let core = state.getVersion().core;
  for (let item of core.staffList) item = item.replace(" ", "").toUpperCase();

  if (core.staffList.indexOf(val) === -1) return true;
  else return false;
};

let checkRoom = (val) => {
  val = val.replace(" ", "");

  if (val === "") return false;

  let core = state.getVersion().core;
  for (let item of core.roomList) item = item.replace(" ", "");

  if (core.roomList.indexOf(val) === -1) return true;
  else return false;
};

let checkClass = (val) => {
  if (val.indexOf("/") === -1) return true;

  val = val.replace(" ", "").split("/");
  if (val.length !== 2 || val[0].length < 1 || val[1].length < 1) return true;

  let pattern = /^[a-z0-9]+$/i;
  if (!pattern.test(val[1])) return true;

  let core = state.getVersion().core;

  //console.log("check.checkClass():");
  //console.log(core.subjectList);
  for (let item of core.subjectList) item = item.replace(" ", "");

  if (core.subjectList.indexOf(val[0]) === -1) return true;

  return false;
};

export { checkInput, updateErrors };
