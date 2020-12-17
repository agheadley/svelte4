/* use letters for blocks, no block "-" symbol */

let createTimetableTemplates = (periodData) => {
  let row = [];
  for (let i = 0; i < periodData.length; i++) {
    let item = periodData[i];
    row.push({
      d: (" " + item.day).trim(),
      p: (" " + item.per).trim(),
      w: (" " + item.week).trim(),
      id: (" " + item.id).trim(),
      b: (" " + item.block).trim(),
      c: "",
      s: "",
      r: "",
      e: ""
    });
  }

  let rowList = [];
  for (let i = 0; i < row.length; i++) rowList.push(i);

  let weekList = row.map((el) => el.w).sort();
  weekList = [...new Set(weekList)];

  //console.log("row", row);
  let blockList = createBlockTemplate(row);
  //console.log("blockrow", blockRow);
  return {
    row: row,
    rowList: rowList,
    blockList: blockList,
    weekList: weekList
  };
};

let createBlockTemplate = (row) => {
  let blocks = row
    .filter((el) => (" " + el.b).trim() !== "-")
    .map((el) => (" " + el.b).trim())
    .sort();
  blocks = [...new Set(blocks)];
  //console.log("blocks:", blocks);

  let blockList = [];
  for (let block of blocks) {
    let lessons = row.filter((el) => (" " + el.b).trim() === block);
    console.log("block", block);
    console.log("lessons", lessons);
    for (let lesson of lessons) {
      //blockList.push(lesson.i);
      let index = row.findIndex(
        (el) => el.p === lesson.p && el.d === lesson.d && el.w === lesson.w
      );
      console.log(lesson.d, lesson.p, lesson.w, index);
      blockList.push(index);
    }
  }
  return blockList;
};

export { createTimetableTemplates };
