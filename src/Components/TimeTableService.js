import styles from "../Styles/TimeTableService.module.css";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import closeSVG from "../Icons/close.svg";
import ClassRoomCollisionManager from "../Managers/ClassRoomCollisionManager";
import FacultyCollisionManager from "../Managers/FacultyCollisionManager";
function TimeTableService({
  branchName,
  classRoomsState,
  setClassRoomsState,
  classRooms,
  labs,
  setFinalTimeTable,
  finalTimeTable,
  branches,
  setFacultiesState,
  facultiesState,
  faculties,
}) {
  let classRoomCollisionManager = new ClassRoomCollisionManager();
  let facultyCollisionManager = new FacultyCollisionManager();
  const [tableFillers, setTableFillers] = useState([
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
    ],
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
    ],
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
    ],
  ]);
  const [displayClassRoomPicker, setDisplayClassRoomPicker] = useState(false);
  const [availableClassRooms, setAvailableClassRooms] = useState([]);
  const [selectedIJ, setSelectedIJ] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(false);
  const [usedSubjectCounter, setUsedSubjectCounter] = useState({});

  function checkIfIsLab() {
    for (let i = 0; i < branches[branchName].subjects.length; i++) {
      if (branches[branchName].subjects[i].subjectName === selectedSubject) {
        return branches[branchName].subjects[i].isLab;
      }
    }
  }

  function getRequiredClass() {
    for (let i = 0; i < branches[branchName].subjects.length; i++) {
      if (branches[branchName].subjects[i].subjectName === selectedSubject) {
        return branches[branchName].subjects[i].requiredClass;
      }
    }
  }

  function getFacultyNameBySubjectName() {
    let facName = "";
    Object.keys(faculties).map((faculty) => {
      if (faculties[faculty].subjects.includes(selectedSubject)) {
        facName = faculty;
      }
    });
    return facName;
  }

  function displayCRP(cell) {
    // this for loop checks if a time table already has a class at that given time
    for (let i = 0; i < finalTimeTable[cell[0]][cell[1]].length; i++) {
      if (finalTimeTable[cell[0]][cell[1]][i].branchName === branchName) {
        return;
      }
    }
    if (!selectedSubject) {
      toast.error("Please Select A Subject To Place In The Cell");
      return;
    }

    let requiredClass = getRequiredClass();
    let isLab = checkIfIsLab();

    if (!isLab) {
      normalClassHandler(cell, requiredClass);
    } else {
      labHandler(cell, requiredClass);
    }
  }

  function normalClassHandler(cell, requiredClass) {
    let facName = getFacultyNameBySubjectName();
    let isFacultyFree = facultyCollisionManager.checkIfFacultyFree(
      facultiesState,
      facName,
      cell[0],
      cell[1]
    );
    if (!isFacultyFree) {
      toast.error("Faculty For This Class Is Not Free During This Period");
      return;
    }

    let availableClassesForCell = classRoomCollisionManager.getFreeClassRoom(
      classRoomsState,
      classRooms,
      cell[0],
      cell[1],
      requiredClass
    );
    if (availableClassesForCell.length !== 0) {
      setSelectedIJ(cell);
      setAvailableClassRooms(availableClassesForCell);
      setDisplayClassRoomPicker(true);
    } else {
      toast.error("No Class Rooms Free At This Time!");
    }
  }

  function labHandler(cell, requiredClass) {
    if (cell[1] === 7) {
      toast.error("Cannot Add A Lab In The Last Period");
      return;
    }
    let facName = getFacultyNameBySubjectName();
    let isFacultyFree = facultyCollisionManager.checkIfFacultyFree(
      facultiesState,
      facName,
      cell[0],
      cell[1]
    );
    if (!isFacultyFree) {
      toast.error("Faculty For This Lab Is Not Free During This Period");
      return;
    }
    let availableLabsForCell1 = classRoomCollisionManager.getFreeClassRoom(
      classRoomsState,
      labs,
      cell[0],
      cell[1],
      requiredClass
    );
    if (availableLabsForCell1.length !== 0) {
      // check if the next period is free too since lab requires 2 free periods back to back
      let availableLabsForCell2 = classRoomCollisionManager.getFreeClassRoom(
        classRoomsState,
        labs,
        cell[0],
        cell[1] + 1,
        requiredClass
      );
      if (availableLabsForCell2.length !== 0) {
        setSelectedIJ(cell);
        // take the common free required lab , since that means that lab is free for both periods
        const commonArray = availableLabsForCell1.filter((item) =>
          availableLabsForCell2.includes(item)
        );
        setAvailableClassRooms(commonArray);
        setDisplayClassRoomPicker(true);
      } else {
        toast.error(
          `Lab ${requiredClass} Is Already Reserved The Following Period`
        );
      }
    } else {
      toast.error(`Lab ${requiredClass} Is Already Reserved`);
    }
  }

  function bookNormalClass(room) {
    //Book Room
    let newclassRoomsState = classRoomCollisionManager.bookClassRoom(
      classRoomsState,
      room,
      selectedIJ[0],
      selectedIJ[1]
    );

    //Book Faculty
    let facName = getFacultyNameBySubjectName();
    let newFacultiesState = facultyCollisionManager.bookFaculty(
      facultiesState,
      facName,
      selectedIJ[0],
      selectedIJ[1]
    );

    setFacultiesState(newFacultiesState);
    setClassRoomsState(newclassRoomsState);
    localStorage.setItem("classRoomState", JSON.stringify(newclassRoomsState));
    localStorage.setItem("facultiesState", JSON.stringify(newFacultiesState));
    setDisplayClassRoomPicker(false);

    let newFinalTimeTable = [...finalTimeTable];
    newFinalTimeTable[selectedIJ[0]][selectedIJ[1]].push({
      branchName: branchName,
      room: room,
      subjectName: selectedSubject,
      facultyName: facName,
    });
    setFinalTimeTable(newFinalTimeTable);
    localStorage.setItem("finalTimeTable", JSON.stringify(newFinalTimeTable));
    setSelectedSubject(false);
    updateUsedSubjectCounter();
  }

  function bookLab(room) {
    //Book First Period
    let newclassRoomsState = classRoomCollisionManager.bookClassRoom(
      classRoomsState,
      room,
      selectedIJ[0],
      selectedIJ[1]
    );
    //Book Second Period
    let newclassRoomsState2 = classRoomCollisionManager.bookClassRoom(
      classRoomsState,
      room,
      selectedIJ[0],
      selectedIJ[1] + 1
    );
    //Book Faculty For Only The First Period
    let facName = getFacultyNameBySubjectName();
    let newFacultiesState = facultyCollisionManager.bookFaculty(
      facultiesState,
      facName,
      selectedIJ[0],
      selectedIJ[1]
    );
    setClassRoomsState(newclassRoomsState2);
    localStorage.setItem("classRoomState", JSON.stringify(newclassRoomsState));
    setDisplayClassRoomPicker(false);
    let newFinalTimeTable = [...finalTimeTable];
    newFinalTimeTable[selectedIJ[0]][selectedIJ[1]].push({
      branchName: branchName,
      room: room,
      subjectName: selectedSubject,
      facultyName: facName,
    });
    newFinalTimeTable[selectedIJ[0]][selectedIJ[1] + 1].push({
      branchName: branchName,
      room: room,
      subjectName: selectedSubject,
      facultyName: "",
    });
    setFinalTimeTable(newFinalTimeTable);
    localStorage.setItem("finalTimeTable", JSON.stringify(newFinalTimeTable));
    setSelectedSubject(false);
    updateUsedSubjectCounter();
  }

  function bookRoom(room) {
    let isLab = checkIfIsLab();

    if (!isLab) {
      bookNormalClass(room);
    } else {
      bookLab(room);
    }
  }

  function updateUsedSubjectCounterIterator(subjectName) {
    let counter = 0;
    for (let i = 0; i < finalTimeTable.length; i++) {
      for (let j = 0; j < finalTimeTable[i].length; j++) {
        for (let k = 0; k < finalTimeTable[i][j].length; k++) {
          if (finalTimeTable[i][j][k].subjectName === subjectName) {
            counter++;
          }
        }
      }
    }
    return { subjectName: subjectName, counter: counter };
  }

  function updateUsedSubjectCounter() {
    let finalUpdatedUsedSubjects = {};
    for (let i = 0; i < branches[branchName].subjects.length; i++) {
      let temp = updateUsedSubjectCounterIterator(
        branches[branchName].subjects[i].subjectName
      );

      finalUpdatedUsedSubjects[temp.subjectName] = {
        counter: temp.counter,
        totalHours: branches[branchName].subjects[i].totalHours,
        isLab: branches[branchName].subjects[i].isLab,
        isGrouped: branches[branchName].subjects[i].isGrouped,
      };
    }
    setUsedSubjectCounter(finalUpdatedUsedSubjects);
  }

  useEffect(() => {
    updateUsedSubjectCounter();
  }, [branches]);

  return (
    <div key={branchName} className={styles.container}>
      <h3 className={styles.alignTextCenter}>{branchName}</h3>
      {Object.keys(usedSubjectCounter).map((sub) => (
        <button
          className={
            usedSubjectCounter[sub].totalHours -
              usedSubjectCounter[sub].counter ===
            0
              ? styles.hidden
              : usedSubjectCounter[sub].isGrouped
              ? styles.isGrouped
              : usedSubjectCounter[sub].isLab
              ? styles.isLab
              : ""
          }
          onClick={() => {
            setSelectedSubject(sub);
          }}
        >
          {sub} x{" "}
          {usedSubjectCounter[sub].totalHours - usedSubjectCounter[sub].counter}
        </button>
      ))}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>9 - 10</th>
            <th>10 - 11</th>
            <th>11 - 12</th>
            <th>12 - 1</th>
            <th>1 - 2</th>
            <th>2 - 3</th>
            <th>3 - 4</th>
            <th>4 - 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            {tableFillers[0].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              >
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return <label>{innerObject.subjectName}</label>;
                    }
                  })}
                </div>
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return <label>{innerObject.facultyName}</label>;
                    }
                  })}
                </div>
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return <label>{innerObject.room}</label>;
                    }
                  })}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td>Tuesday</td>
            {tableFillers[1].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              ></td>
            ))}
          </tr>
          <tr>
            <td>Wednesday</td>
            {tableFillers[2].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              ></td>
            ))}
          </tr>
          <tr>
            <td>Thrusday</td>
            {tableFillers[3].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              ></td>
            ))}
          </tr>
          <tr>
            <td>Friday</td>
            {tableFillers[4].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              ></td>
            ))}
          </tr>
        </tbody>
      </table>
      {displayClassRoomPicker ? (
        <div className={styles.classRoomPickerContainer}>
          <h3>Pick The Room You Want</h3>
          <img
            src={closeSVG}
            className={styles.close}
            onClick={() => {
              setDisplayClassRoomPicker(false);
            }}
          />
          {availableClassRooms.map((room) => (
            <button
              onClick={() => {
                bookRoom(room);
              }}
            >
              {room}
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TimeTableService;
