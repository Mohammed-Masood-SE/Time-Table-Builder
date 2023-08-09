import styles from "../Styles/HomePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../Components/NavigationBar";
import MCL from "./MCL";
import { useState, useEffect } from "react";
import MB from "./MB";
import MS from "./MS";
import MF from "./MF";
import BTT from "./BTT";
function HomePage() {
  const [classRooms, setClassRooms] = useState([]);
  const [labs, setLabs] = useState([]);
  const [branches, setBranches] = useState({});
  const [faculties, setFaculties] = useState({});

  const [classRoomsState, setClassRoomsState] = useState([
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ]);
  const [facultiesState, setFacultiesState] = useState([]);
  const [finalTimeTable, setFinalTimeTable] = useState([
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ]);

  const [displayMCL, setDisplayMCL] = useState(true);
  const [displayMB, setDisplayMB] = useState(false);
  const [displayMS, setDisplayMS] = useState(false);
  const [displayMF, setDisplayMF] = useState(false);
  const [displayBTT, setDisplayBTT] = useState(false);

  useEffect(() => {
    const temp7 = localStorage.getItem("facultiesState");
    const storedFacultiesState = JSON.parse(temp7);
    if (storedFacultiesState) {
      Object.keys(faculties).map((faculty) => {
        for (let i = 0; i < faculties[faculty].offDays.length; i++) {
          if (faculties[faculty].offDays[i] === "Monday") {
            for (let j = 0; j < storedFacultiesState[0].length; j++) {
              if (!storedFacultiesState[0][j].includes(faculty)) {
                storedFacultiesState[0][j].push(faculty);
              }
            }
          } else if (faculties[faculty].offDays[i] === "Tuesday") {
            for (let j = 0; j < storedFacultiesState[1].length; j++) {
              if (!storedFacultiesState[1][j].includes(faculty)) {
                storedFacultiesState[1][j].push(faculty);
              }
            }
          } else if (faculties[faculty].offDays[i] === "Wednesday") {
            for (let j = 0; j < storedFacultiesState[2].length; j++) {
              if (!storedFacultiesState[0][j].includes(faculty)) {
                storedFacultiesState[2][j].push(faculty);
              }
            }
          } else if (faculties[faculty].offDays[i] === "Thrusday") {
            for (let j = 0; j < storedFacultiesState[3].length; j++) {
              if (!storedFacultiesState[0][j].includes(faculty)) {
                storedFacultiesState[3][j].push(faculty);
              }
            }
          } else if (faculties[faculty].offDays[i] === "Friday") {
            for (let j = 0; j < storedFacultiesState[4].length; j++) {
              if (!storedFacultiesState[0][j].includes(faculty)) {
                storedFacultiesState[4][j].push(faculty);
              }
            }
          }
        }
      });
      setFacultiesState(storedFacultiesState);
    } else {
      let arr = [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ];
      Object.keys(faculties).map((faculty) => {
        for (let i = 0; i < faculties[faculty].offDays.length; i++) {
          if (faculties[faculty].offDays[i] === "Monday") {
            for (let j = 0; j < arr[0].length; j++) {
              arr[0][j].push(faculty);
            }
          } else if (faculties[faculty].offDays[i] === "Tuesday") {
            for (let j = 0; j < arr[1].length; j++) {
              arr[1][j].push(faculty);
            }
          } else if (faculties[faculty].offDays[i] === "Wednesday") {
            for (let j = 0; j < arr[2].length; j++) {
              arr[2][j].push(faculty);
            }
          } else if (faculties[faculty].offDays[i] === "Thrusday") {
            for (let j = 0; j < arr[3].length; j++) {
              arr[3][j].push(faculty);
            }
          } else if (faculties[faculty].offDays[i] === "Friday") {
            for (let j = 0; j < arr[4].length; j++) {
              arr[4][j].push(faculty);
            }
          }
        }
      });
      setFacultiesState(arr);
      localStorage.setItem("facultiesState", JSON.stringify(arr));
    }
  }, [faculties]);

  useEffect(() => {
    const temp = localStorage.getItem("classRooms");
    const storedClassRooms = JSON.parse(temp);
    if (storedClassRooms) {
      setClassRooms(storedClassRooms);
    }
    const temp2 = localStorage.getItem("labs");
    const storedLabs = JSON.parse(temp2);
    if (storedLabs) {
      setLabs(storedLabs);
    }
    const temp3 = localStorage.getItem("branches");
    const storedBranches = JSON.parse(temp3);
    if (storedBranches) {
      setBranches(storedBranches);
    }
    const temp4 = localStorage.getItem("faculties");
    const storedFaculties = JSON.parse(temp4);
    if (storedFaculties) {
      setFaculties(storedFaculties);
    }
    const temp5 = localStorage.getItem("finalTimeTable");
    const storedFinalTimetable = JSON.parse(temp5);
    if (storedFinalTimetable) {
      setFinalTimeTable(storedFinalTimetable);
    } else {
      let ftt = [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ];
      setFinalTimeTable(ftt);
      localStorage.setItem("finalTimeTable", JSON.stringify(ftt));
    }
    const temp6 = localStorage.getItem("classRoomState");
    const storedClassRoomState = JSON.parse(temp6);
    if (storedClassRoomState) {
      setClassRoomsState(storedClassRoomState);
    } else {
      let CRS = [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ];
      setClassRoomsState(CRS);
      localStorage.setItem("classRoomState", JSON.stringify(CRS));
    }
  }, []);

  function insertTestData() {
    let testClassrooms = ["100", "101", "102", "103"];
    let testLabs = ["200", "201"];
    let testBranches = {
      "B.tech CSE 1": {
        subjects: [
          {
            subjectName: "C Programming",
            totalHours: 5,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
          {
            subjectName: "Java Programming",
            totalHours: 5,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
          {
            subjectName: "C Programming LAB",
            totalHours: 2,
            isGrouped: false,
            groupedWith: [],
            isLab: true,
            requiredClass: "200",
          },
          {
            subjectName: "Java Programming LAB",
            totalHours: 2,
            isGrouped: false,
            groupedWith: [],
            isLab: true,
            requiredClass: "201",
          },
          {
            subjectName: "Arabic 1",
            totalHours: 1,
            isGrouped: true,
            groupedWith: ["B.tech CSE 2"],
            isLab: false,
            requiredClass: "Any",
          },
        ],
      },

      "B.tech CSE 2": {
        subjects: [
          {
            subjectName: "Web Development",
            totalHours: 5,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
          {
            subjectName: "C++ Programming",
            totalHours: 5,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
          {
            subjectName: "Web Development LAB",
            totalHours: 2,
            isGrouped: false,
            groupedWith: [],
            isLab: true,
            requiredClass: "200",
          },
          {
            subjectName: "C++ Programming LAB",
            totalHours: 2,
            isGrouped: false,
            groupedWith: [],
            isLab: true,
            requiredClass: "201",
          },
          {
            subjectName: "Arabic 1",
            totalHours: 1,
            isGrouped: true,
            groupedWith: ["B.tech CSE 1"],
            isLab: false,
            requiredClass: "Any",
          },
        ],
      },

      "B.tech CSE 3": {
        subjects: [
          {
            subjectName: "AI",
            totalHours: 7,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
          {
            subjectName: "ML",
            totalHours: 3,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
          {
            subjectName: "AI LAB",
            totalHours: 2,
            isGrouped: false,
            groupedWith: [],
            isLab: true,
            requiredClass: "200",
          },
          {
            subjectName: "ML LAB",
            totalHours: 2,
            isGrouped: false,
            groupedWith: [],
            isLab: true,
            requiredClass: "201",
          },
          {
            subjectName: "Arabic 2",
            totalHours: 1,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
        ],
      },
    };
    let testFaculties = {
      "Lipsa Maam": {
        subjects: [
          "C Programming LAB",
          "Web Development",
          "Web Development LAB",
          "C Programming",
        ],
        offDays: ["Monday"],
      },
      "Ved Sir": {
        subjects: [
          "Java Programming",
          "Java Programming LAB",
          "C++ Programming",
          "C++ Programming LAB",
        ],
        offDays: ["Friday"],
      },
      "Arabic Maam": {
        subjects: ["Arabic 1", "Arabic 2"],
        offDays: ["Friday", "Monday"],
      },
      "Vinod Sir": {
        subjects: ["AI", "ML", "AI LAB", "ML LAB"],
        offDays: ["Thrusday"],
      },
    };
    setClassRooms(testClassrooms);
    setLabs(testLabs);
    setBranches(testBranches);
    setFaculties(testFaculties);
    localStorage.removeItem("classRoomState");
    localStorage.removeItem("facultiesState");
    localStorage.removeItem("finalTimeTable");
    setClassRoomsState([
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ]);

    let arr = [
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ];
    Object.keys(faculties).map((faculty) => {
      for (let i = 0; i < faculties[faculty].offDays.length; i++) {
        if (faculties[faculty].offDays[i] === "Monday") {
          for (let j = 0; j < arr[0].length; j++) {
            arr[0][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Tuesday") {
          for (let j = 0; j < arr[1].length; j++) {
            arr[1][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Wednesday") {
          for (let j = 0; j < arr[2].length; j++) {
            arr[2][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Thrusday") {
          for (let j = 0; j < arr[3].length; j++) {
            arr[3][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Friday") {
          for (let j = 0; j < arr[4].length; j++) {
            arr[4][j].push(faculty);
          }
        }
      }
    });
    setFacultiesState(arr);

    setFinalTimeTable([
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ]);
    let temp = [
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ];
    localStorage.setItem("facultiesState", JSON.stringify(arr));
    localStorage.setItem("finalTimeTable", JSON.stringify(temp));
    localStorage.setItem("classRoomState", JSON.stringify(temp));
    localStorage.setItem("classRooms", JSON.stringify(testClassrooms));
    localStorage.setItem("labs", JSON.stringify(testLabs));
    localStorage.setItem("branches", JSON.stringify(testBranches));
    localStorage.setItem("faculties", JSON.stringify(testFaculties));
  }

  function resetData() {
    localStorage.removeItem("classRoomState");
    localStorage.removeItem("facultiesState");
    localStorage.removeItem("finalTimeTable");
    setClassRoomsState([
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ]);

    let arr = [
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ];
    Object.keys(faculties).map((faculty) => {
      for (let i = 0; i < faculties[faculty].offDays.length; i++) {
        if (faculties[faculty].offDays[i] === "Monday") {
          for (let j = 0; j < arr[0].length; j++) {
            arr[0][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Tuesday") {
          for (let j = 0; j < arr[1].length; j++) {
            arr[1][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Wednesday") {
          for (let j = 0; j < arr[2].length; j++) {
            arr[2][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Thrusday") {
          for (let j = 0; j < arr[3].length; j++) {
            arr[3][j].push(faculty);
          }
        } else if (faculties[faculty].offDays[i] === "Friday") {
          for (let j = 0; j < arr[4].length; j++) {
            arr[4][j].push(faculty);
          }
        }
      }
    });
    setFacultiesState(arr);

    setFinalTimeTable([
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ]);
    let temp = [
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ];
    localStorage.setItem("facultiesState", JSON.stringify(arr));
    localStorage.setItem("finalTimeTable", JSON.stringify(temp));
    localStorage.setItem("classRoomState", JSON.stringify(temp));
  }

  return (
    <div className={styles.background}>
      <button
        style={{ position: "absolute", bottom: 0, right: 0 }}
        onClick={insertTestData}
      >
        Test Data
      </button>
      <NavigationBar
        setDisplayMCL={setDisplayMCL}
        setDisplayMB={setDisplayMB}
        setDisplayMS={setDisplayMS}
        setDisplayMF={setDisplayMF}
        setDisplayBTT={setDisplayBTT}
      />
      {displayMCL ? (
        <MCL
          setClassRooms={setClassRooms}
          setLabs={setLabs}
          classRooms={classRooms}
          labs={labs}
          branches={branches}
          setBranches={setBranches}
          resetData={resetData}
        />
      ) : (
        <></>
      )}
      {displayMB ? (
        <MB
          branches={branches}
          setBranches={setBranches}
          resetData={resetData}
        />
      ) : (
        <></>
      )}
      {displayMS ? (
        <MS
          branches={branches}
          setBranches={setBranches}
          classRooms={classRooms}
          labs={labs}
          resetData={resetData}
        />
      ) : (
        <></>
      )}
      {displayMF ? (
        <MF
          branches={branches}
          faculties={faculties}
          setFaculties={setFaculties}
          classRoomsState={classRoomsState}
          setClassRoomsState={setClassRoomsState}
          facultiesState={facultiesState}
          setFacultiesState={setFacultiesState}
          setFinalTimeTable={setFinalTimeTable}
          resetData={resetData}
        />
      ) : (
        <></>
      )}
      {displayBTT ? (
        <BTT
          branches={branches}
          faculties={faculties}
          classRooms={classRooms}
          labs={labs}
          setFinalTimeTable={setFinalTimeTable}
          finalTimeTable={finalTimeTable}
          classRoomsState={classRoomsState}
          setClassRoomsState={setClassRoomsState}
          facultiesState={facultiesState}
          setFacultiesState={setFacultiesState}
        />
      ) : (
        <></>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default HomePage;
