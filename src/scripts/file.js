let csvDownload = (arr2d, filename) => {
  let eol = String.fromCharCode(13) + String.fromCharCode(10);
  let content = "";
  arr2d.forEach(function (row, index) {
    content += row.join(",") + eol;
  });
  //content = encodeURI(content);

  var blob = new Blob([content], { type: "text/plain" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

let download = (text, filename) => {
  var blob = new Blob([text], { type: "text/plain" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

let read = (fileObj, callback) => {
  let reader = new FileReader();
  reader.readAsText(fileObj);
  reader.onload = () => {
    callback(reader.result);
  };
};

// outputs arr of objects with keys as first line of csv
// checks against headerArr
// e.g ['id','name',['info',false]]
// checks headers are present and each line has a value for
// id and name, info optional.

let csvProcess = (txt, headArr) => {
  let data = csvToArray(txt);

  //console.log(data);
  for (let [i, v] of data[0].entries()) {
    data[0][i] = (" " + v).toLowerCase().trim();
    //console.log(data[0]);
  }

  let headers = [];
  let valid = true;

  // add true, to non-array - i.e. must be present in data rows.
  let checkArr = [];
  for (let item of headArr) {
    if (!Array.isArray(item)) checkArr.push([item, true]);
    else checkArr.push(item);
  }

  console.log("checArr", checkArr);

  // now check headers are present in data
  for (let item of checkArr) {
    if (data[0].indexOf(item[0]) > -1)
      headers.push({
        name: item[0],
        index: data[0].indexOf(item[0]),
        check: item[1]
      });
    else valid = false;
  }

  console.log("csvProcess, headers ", headers, valid);

  let out = [];
  for (let i = 1; i < data.length; i++) {
    let obj = {};
    for (let item of headers) {
      obj[item.name] = data[i][item.index];
      if (item.check && !data[i][item.index]) {
        valid = false;
        console.log(
          "error finding data for ",
          item.name,
          item.check,
          data[i][item.index]
        );
      }
    }
    out.push(obj);
  }
  console.log(out, valid);

  return { data: out, valid: valid };
};

//https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
//2d array from csv file
let csvToArray = (text) => {
  let p = "",
    row = [""],
    ret = [row],
    i = 0,
    r = 0,
    s = !0,
    l;
  for (l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if ("," === l && s) l = row[++i] = "";
    else if ("\n" === l && s) {
      if ("\r" === p) row[i] = row[i].slice(0, -1);
      row = ret[++r] = [(l = "")];
      i = 0;
    } else row[i] += l;
    p = l;
  }
  return ret;
};

export { read, csvProcess, download, csvDownload, csvToArray };
