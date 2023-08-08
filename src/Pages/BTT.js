import styles from "../Styles/BTT.module.css";
import { useRef, useState, useEffect } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";
import TimeTableService from "../Components/TimeTableService";

function BTT({
  branches,
  faculties,
  classRooms,
  labs,
  setFinalTimeTable,
  finalTimeTable,
}) {
  const [allSubjectsPicked, setAllSubjectsPicked] = useState([]);
  const [classRoomsState, setClassRoomsState] = useState([
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ]);
  const [facultiesState, setFacultiesState] = useState([]);

  function removedAlreadyPickedSubjects(oldAllSubjects) {
    let Keys = Object.keys(faculties);
    let newAllSubjects = [...oldAllSubjects];
    for (let i = 0; i < Keys.length; i++) {
      let tempSubjects = faculties[Keys[i]].subjects;
      for (let j = 0; j < tempSubjects.length; j++) {
        newAllSubjects = newAllSubjects.filter(
          (subject) => subject !== faculties[Keys[i]].subjects[j]
        );
      }
    }
    setAllSubjectsPicked(newAllSubjects);
  }

  function getEverySubject() {
    let Keys = Object.keys(branches);
    let newAllSubjects = [];
    for (let i = 0; i < Keys.length; i++) {
      let tempSubjects = branches[Keys[i]].subjects;
      for (let j = 0; j < tempSubjects.length; j++) {
        if (!newAllSubjects.includes(tempSubjects[j].subjectName)) {
          newAllSubjects.push(tempSubjects[j].subjectName);
        }
      }
    }
    removedAlreadyPickedSubjects(newAllSubjects);
  }

  useEffect(() => {
    const temp = localStorage.getItem("classRoomState");
    const storedClassRoomState = JSON.parse(temp);
    if (storedClassRoomState) {
      setClassRoomsState(storedClassRoomState);
    }
    const temp2 = localStorage.getItem("facultiesState");
    const storedFacultiesState = JSON.parse(temp2);
    if (storedFacultiesState) {
      setFacultiesState(storedClassRoomState);
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
    }
  }, []);

  useEffect(() => {
    getEverySubject();
  }, [branches, faculties]);

  return (
    <div className={styles.container}>
      {allSubjectsPicked.length === 0 ? (
        <div>
          {Object.keys(branches).map((branch) => (
            <TimeTableService
              key={branch}
              branchName={branch}
              classRoomsState={classRoomsState}
              setClassRoomsState={setClassRoomsState}
              classRooms={classRooms}
              labs={labs}
              setFinalTimeTable={setFinalTimeTable}
              finalTimeTable={finalTimeTable}
              branches={branches}
              setFacultiesState={setFacultiesState}
              facultiesState={facultiesState}
              faculties={faculties}
            />
          ))}
        </div>
      ) : (
        <div>
          <div>
            <label>
              Please Make Sure Every Subject Has Been Assigned To A Faculty
            </label>
          </div>
          <div className={styles.marginTop}>
            <label>Subjects That Have No Faculty Assigned : </label>
          </div>
          {allSubjectsPicked.map((subject) => (
            <div key={subject} className={styles.marginTop}>
              <label>{subject}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BTT;
