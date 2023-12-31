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
  function checkIfIsGrouped() {
    for (let i = 0; i < branches[branchName].subjects.length; i++) {
      if (branches[branchName].subjects[i].subjectName === selectedSubject) {
        return branches[branchName].subjects[i].isGrouped;
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
  function isGroupedBranchesFree(cell) {
    let groups = branches[branchName].subjects.filter(
      (sub) => sub.subjectName === selectedSubject
    );
    let groupedWith = groups[0].groupedWith;

    //Check If Every Branch Is Free
    let isEveryBranchFree = true;
    for (let i = 0; i < groupedWith.length; i++) {
      let reply = finalTimeTable[cell[0]][cell[1]].filter(
        (item) => item.branchName === groupedWith[i]
      );
      if (reply.length > 0) {
        isEveryBranchFree = false;
      }
    }

    return isEveryBranchFree;
  }

  function getGroupedWithClasses(selectedSubjectx) {
    let groups = branches[branchName].subjects.filter(
      (sub) => sub.subjectName === selectedSubjectx
    );
    let groupedWith = groups[0].groupedWith;
    return groupedWith;
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
    let isGrouped = checkIfIsGrouped();
    if (!isLab) {
      if (isGrouped) {
        groupedClassHandler(cell, requiredClass);
      } else {
        normalClassHandler(cell, requiredClass);
      }
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
      toast.error(
        "Faculty For This Class Is Not Free During This Period Or Has An Off Day"
      );
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

  function groupedClassHandler(cell, requiredClass) {
    //Check If Every Batch Is Free At That Time
    let allBatchesFree = isGroupedBranchesFree(cell);

    if (!allBatchesFree) {
      toast.error(
        "Not Every Batch Grouped With This Subject Is Free During This Time"
      );
      return;
    }
    //Check If Faculty Is Free
    let facName = getFacultyNameBySubjectName();
    let isFacultyFree = facultyCollisionManager.checkIfFacultyFree(
      facultiesState,
      facName,
      cell[0],
      cell[1]
    );
    if (!isFacultyFree) {
      toast.error(
        "Faculty For This Class Is Not Free During This Period Or Has An Off Day"
      );
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
      toast.error(
        "Faculty For This Lab Is Not Free During This Period Or Has An Off Day"
      );
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
      isLab: false,
      isGrouped: false,
    });
    setFinalTimeTable(newFinalTimeTable);
    localStorage.setItem("finalTimeTable", JSON.stringify(newFinalTimeTable));
    setSelectedSubject(false);
    updateUsedSubjectCounter();
  }
  function bookGroupedClass(room) {
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
    let groupedWith = getGroupedWithClasses(selectedSubject);
    let newFinalTimeTable = [...finalTimeTable];
    newFinalTimeTable[selectedIJ[0]][selectedIJ[1]].push({
      branchName: branchName,
      room: room,
      subjectName: selectedSubject,
      facultyName: facName,
      isLab: false,
      isGrouped: true,
    });
    for (let i = 0; i < groupedWith.length; i++) {
      newFinalTimeTable[selectedIJ[0]][selectedIJ[1]].push({
        branchName: groupedWith[i],
        room: room,
        subjectName: selectedSubject,
        facultyName: facName,
        isLab: false,
        isGrouped: true,
      });
    }
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
    localStorage.setItem("facultiesState", JSON.stringify(newFacultiesState));
    setFacultiesState(newFacultiesState);
    setDisplayClassRoomPicker(false);
    let newFinalTimeTable = [...finalTimeTable];
    newFinalTimeTable[selectedIJ[0]][selectedIJ[1]].push({
      branchName: branchName,
      room: room,
      subjectName: selectedSubject,
      facultyName: facName,
      isLab: true,
      isGrouped: false,
    });
    newFinalTimeTable[selectedIJ[0]][selectedIJ[1] + 1].push({
      branchName: branchName,
      room: room,
      subjectName: selectedSubject,
      facultyName: "",
      isLab: true,
      isGrouped: false,
    });
    setFinalTimeTable(newFinalTimeTable);
    localStorage.setItem("finalTimeTable", JSON.stringify(newFinalTimeTable));
    setSelectedSubject(false);
    updateUsedSubjectCounter();
  }

  function bookRoom(room) {
    let isLab = checkIfIsLab();
    let isGrouped = checkIfIsGrouped();
    if (!isLab) {
      if (isGrouped) {
        bookGroupedClass(room);
      } else {
        bookNormalClass(room);
      }
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

      if (branches[branchName].subjects[i].isGrouped) {
        finalUpdatedUsedSubjects[temp.subjectName] = {
          counter:
            temp.counter -
            branches[branchName].subjects[i].totalHours *
              branches[branchName].subjects[i].groupedWith.length,
          totalHours: branches[branchName].subjects[i].totalHours,
          isLab: branches[branchName].subjects[i].isLab,
          isGrouped: branches[branchName].subjects[i].isGrouped,
        };
      } else {
        finalUpdatedUsedSubjects[temp.subjectName] = {
          counter:
            temp.counter > branches[branchName].subjects[i].totalHours
              ? branches[branchName].subjects[i].totalHours
              : temp.counter,
          totalHours: branches[branchName].subjects[i].totalHours,
          isLab: branches[branchName].subjects[i].isLab,
          isGrouped: branches[branchName].subjects[i].isGrouped,
        };
      }
    }
    setUsedSubjectCounter(finalUpdatedUsedSubjects);
  }

  function checkIfNextPeriodIsTheSameLab(cellData) {
    if (cellData.facultyName === "") {
      return false;
    } else {
      return true;
    }
  }

  //CLEAN THIS FUNCTION UP
  function deleteFromTable(cell) {
    let cellData = false;
    // Get All The Data In The Cell Before Deleting
    for (let i = 0; i < finalTimeTable[cell[0]][cell[1]].length; i++) {
      if (finalTimeTable[cell[0]][cell[1]][i].branchName === branchName) {
        cellData = finalTimeTable[cell[0]][cell[1]][i];
      }
    }
    if (!cellData) {
      toast.error("Cannot Delete An Empty Cell");
      return;
    }
    if (cellData.isGrouped) {
      // free the classRoom
      let newclassRoomsState = classRoomCollisionManager.freeUpClassRoom(
        classRoomsState,
        cellData.room,
        cell[0],
        cell[1]
      );
      setClassRoomsState(newclassRoomsState);
      localStorage.setItem(
        "classRoomState",
        JSON.stringify(newclassRoomsState)
      );
      //Free the Faculty
      let newFacultiesState = facultyCollisionManager.freeUpFaculty(
        facultiesState,
        cellData.facultyName,
        cell[0],
        cell[1]
      );
      setFacultiesState(newFacultiesState);
      localStorage.setItem("facultiesState", JSON.stringify(newFacultiesState));
      //Remove From Time Table
      let newFinalTimeTable = [...finalTimeTable];
      newFinalTimeTable[cell[0]][cell[1]] = newFinalTimeTable[cell[0]][
        cell[1]
      ].filter((x) => x.branchName !== branchName);
      let groups = getGroupedWithClasses(cellData.subjectName);
      for (let i = 0; i < groups.length; i++) {
        newFinalTimeTable[cell[0]][cell[1]] = newFinalTimeTable[cell[0]][
          cell[1]
        ].filter((x) => x.branchName !== groups[i]);
      }
      setFinalTimeTable(newFinalTimeTable);
      localStorage.setItem("finalTimeTable", JSON.stringify(newFinalTimeTable));
      updateUsedSubjectCounter();
      return;
    }
    if (!cellData.isLab) {
      // free the classRoom
      let newclassRoomsState = classRoomCollisionManager.freeUpClassRoom(
        classRoomsState,
        cellData.room,
        cell[0],
        cell[1]
      );
      setClassRoomsState(newclassRoomsState);
      localStorage.setItem(
        "classRoomState",
        JSON.stringify(newclassRoomsState)
      );
      //Free The Faculty
      let newFacultiesState = facultyCollisionManager.freeUpFaculty(
        facultiesState,
        cellData.facultyName,
        cell[0],
        cell[1]
      );
      setFacultiesState(newFacultiesState);
      localStorage.setItem("facultiesState", JSON.stringify(newFacultiesState));
      //Remove From Time Table
      let newFinalTimeTable = [...finalTimeTable];
      newFinalTimeTable[cell[0]][cell[1]] = newFinalTimeTable[cell[0]][
        cell[1]
      ].filter((x) => x.branchName !== branchName);
      setFinalTimeTable(newFinalTimeTable);
      localStorage.setItem("finalTimeTable", JSON.stringify(newFinalTimeTable));
      updateUsedSubjectCounter();
    } else {
      let isNext = checkIfNextPeriodIsTheSameLab(cellData);
      if (isNext) {
        let newclassRoomsState = classRoomCollisionManager.freeUpClassRoom(
          classRoomsState,
          cellData.room,
          cell[0],
          cell[1]
        );
        let newclassRoomsState2 = classRoomCollisionManager.freeUpClassRoom(
          classRoomsState,
          cellData.room,
          cell[0],
          cell[1] + 1
        );
        setClassRoomsState(newclassRoomsState2);
        localStorage.setItem(
          "classRoomState",
          JSON.stringify(newclassRoomsState)
        );
        let newFacultiesState = facultyCollisionManager.freeUpFaculty(
          facultiesState,
          cellData.facultyName,
          cell[0],
          cell[1]
        );
        setFacultiesState(newFacultiesState);
        localStorage.setItem(
          "facultiesState",
          JSON.stringify(newFacultiesState)
        );
        let newFinalTimeTable = [...finalTimeTable];
        newFinalTimeTable[cell[0]][cell[1]] = newFinalTimeTable[cell[0]][
          cell[1]
        ].filter((x) => x.branchName !== branchName);
        newFinalTimeTable[cell[0]][cell[1] + 1] = newFinalTimeTable[cell[0]][
          cell[1]
        ].filter((x) => x.branchName !== branchName);
        setFinalTimeTable(newFinalTimeTable);
        localStorage.setItem(
          "finalTimeTable",
          JSON.stringify(newFinalTimeTable)
        );
        updateUsedSubjectCounter();
      } else {
        let newclassRoomsState = classRoomCollisionManager.freeUpClassRoom(
          classRoomsState,
          cellData.room,
          cell[0],
          cell[1]
        );
        let newclassRoomsState2 = classRoomCollisionManager.freeUpClassRoom(
          classRoomsState,
          cellData.room,
          cell[0],
          cell[1] - 1
        );
        setClassRoomsState(newclassRoomsState2);
        localStorage.setItem(
          "classRoomState",
          JSON.stringify(newclassRoomsState)
        );
        let prevCellData = false;
        for (let i = 0; i < finalTimeTable[cell[0]][cell[1]].length; i++) {
          if (finalTimeTable[cell[0]][cell[1]][i].branchName === branchName) {
            prevCellData = finalTimeTable[cell[0]][cell[1] - 1][i];
          }
        }

        let newFacultiesState = facultyCollisionManager.freeUpFaculty(
          facultiesState,
          prevCellData.facultyName,
          cell[0],
          cell[1] - 1
        );

        setFacultiesState(newFacultiesState);
        localStorage.setItem(
          "facultiesState",
          JSON.stringify(newFacultiesState)
        );
        let newFinalTimeTable = [...finalTimeTable];
        newFinalTimeTable[cell[0]][cell[1]] = newFinalTimeTable[cell[0]][
          cell[1]
        ].filter((x) => x.branchName !== branchName);
        newFinalTimeTable[cell[0]][cell[1] - 1] = newFinalTimeTable[cell[0]][
          cell[1]
        ].filter((x) => x.branchName !== branchName);
        setFinalTimeTable(newFinalTimeTable);
        localStorage.setItem(
          "finalTimeTable",
          JSON.stringify(newFinalTimeTable)
        );
        updateUsedSubjectCounter();
      }
    }
  }

  useEffect(() => {
    updateUsedSubjectCounter();
  }, [branches, finalTimeTable]);

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
          {sub} -{" "}
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
                      return (
                        <div>
                          <img
                            src={closeSVG}
                            className={styles.smallerclose}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteFromTable(cell);
                            }}
                          />{" "}
                          <label>{innerObject.subjectName}</label>
                        </div>
                      );
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
              >
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return (
                        <div>
                          <img
                            src={closeSVG}
                            className={styles.smallerclose}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteFromTable(cell);
                            }}
                          />{" "}
                          <label>{innerObject.subjectName}</label>
                        </div>
                      );
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
            <td>Wednesday</td>
            {tableFillers[2].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              >
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return (
                        <div>
                          <img
                            src={closeSVG}
                            className={styles.smallerclose}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteFromTable(cell);
                            }}
                          />{" "}
                          <label>{innerObject.subjectName}</label>
                        </div>
                      );
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
            <td>Thrusday</td>
            {tableFillers[3].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              >
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return (
                        <div>
                          <img
                            src={closeSVG}
                            className={styles.smallerclose}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteFromTable(cell);
                            }}
                          />{" "}
                          <label>{innerObject.subjectName}</label>
                        </div>
                      );
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
            <td>Friday</td>
            {tableFillers[4].map((cell) => (
              <td
                onClick={() => {
                  displayCRP(cell);
                }}
              >
                <div>
                  {finalTimeTable[cell[0]][cell[1]].map((innerObject) => {
                    if (innerObject.branchName === branchName) {
                      return (
                        <div>
                          <img
                            src={closeSVG}
                            className={styles.smallerclose}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteFromTable(cell);
                            }}
                          />{" "}
                          <label>{innerObject.subjectName}</label>
                        </div>
                      );
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
