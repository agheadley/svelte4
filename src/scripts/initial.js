//import * as state from "./state";

let core = {
  yearList: ["7", "6", "5", "4", "3", "2", "1", "0"],
  weekList: ["A"],
  subjectList: ["B", "C", "Cs", "Ch", "E", "M"],
  staffList: ["AAA", "BBB", "CCC"],
  roomList: ["A1", "A2", "A3"],
  deptList: [
    { dept: "CHE", subject: "C", room: "A1" },
    { dept: "CHE", subject: "Cs", room: "A2" }
  ],
  basedata: {
    staff: [
      { code: "AAA", name: "A.Abbott" },
      { code: "BBB", name: "B.Bishop" },
      { code: "CCC", name: "C.Canon" }
    ],
    rooms: [{ code: "A1" }, { code: "A2" }, { code: "A3" }],
    subjects: [
      { code: "B", name: "Biology" },
      { code: "C", name: "Chemistry" },
      { code: "Cs", name: "Chemistry IBHL" },
      { code: "Ch", name: "Chemistry IBSL" },
      { code: "E", name: "English" },
      { code: "M", name: "Mathematics" }
    ]
  },
  row: [
    {
      d: "M",
      p: "1",
      w: "A",
      id: "1",
      b: "A",
      c: "",
      s: "",
      r: "",
      e: ""
    }
  ],
  rowList: [0],
  blockList: [0],
  blockColor: {
    A: "#f5f0e4",
    B: "#d1e8e7",
    C: "#e5ebd8",
    D: "#f5e7e4",
    E: "#d1e0e8"
  }
};

export { core };
