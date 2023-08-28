import styles from "../Styles/MF.module.css";
import { useRef, useState, useEffect } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";

function MF({
  branches,
  setFaculties,
  faculties,
  classRoomsState,
  setClassRoomsState,
  facultiesState,
  setFacultiesState,
  setFinalTimeTable,
  resetData,
}) {
  const facultyNameInputRef = useRef(null);
  const selectedFaculty = useRef(null);
  const selectedOffDay = useRef(null);
  const selectedSubject = useRef(null);
  const [selectedFacultyState, setSelectedFacultyState] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  function createNewFaculty(facultyName) {
    if (!facultyName) {
      toast.error("Input Field Is Blank");
      return;
    }
    if (faculties[facultyName]) {
      toast.error("Faculty Already Exists With That Name");
      return;
    }
    const newFacultiesState = {
      ...faculties,
      [facultyName]: {
        subjects: [],
        offDays: [],
      },
    };
    localStorage.setItem("faculties", JSON.stringify(newFacultiesState));
    setFaculties(newFacultiesState);
    toast.success("Faculty Created");
    resetData();
  }

  const handleFacultyChange = () => {
    const selectedValue = selectedFaculty.current.value;
    setSelectedFacultyState(selectedValue);
  };
  const addOffDay = () => {
    const selectedValue = selectedOffDay.current.value;
    if (selectedValue === "default") {
      toast.error(`Please Select An Off Day Before Adding`);
      return;
    }
    let newFaculties = { ...faculties };
    let newOffDays = newFaculties[selectedFacultyState].offDays;
    if (newOffDays.includes(selectedValue)) {
      toast.error(
        `${selectedValue} Already Exists In ${selectedFacultyState}'s Off Days`
      );
      return;
    }
    newOffDays.push(selectedValue);
    newFaculties[selectedFacultyState].offDays = newOffDays;
    setFaculties(newFaculties);
    localStorage.setItem("faculties", JSON.stringify(newFaculties));
    toast.success(
      `Added ${selectedValue} As An Off Day Successfully to ${selectedFacultyState}`
    );
    resetData();
  };

  const addSubject = () => {
    const selectedValue = selectedSubject.current.value;
    if (selectedValue === "default") {
      toast.error(`Please Select A Subject Before Adding`);
      return;
    }
    let newFaculties = { ...faculties };
    let newSubjects = newFaculties[selectedFacultyState].subjects;
    if (newSubjects.includes(selectedValue)) {
      toast.error(
        `${selectedValue} Already Exists In ${selectedFacultyState}'s Subjects`
      );
      return;
    }
    newSubjects.push(selectedValue);
    newFaculties[selectedFacultyState].subjects = newSubjects;
    setFaculties(newFaculties);
    localStorage.setItem("faculties", JSON.stringify(newFaculties));
    toast.success(
      `Added ${selectedValue} Successfully to ${selectedFacultyState}`
    );
    resetData();
    selectedSubject.current.value = "default";
  };

  const removeOffDay = (offDay) => {
    let newFaculties = { ...faculties };
    let newOffDays = newFaculties[selectedFacultyState].offDays.filter(
      (item) => item !== offDay
    );
    newFaculties[selectedFacultyState].offDays = newOffDays;
    setFaculties(newFaculties);
    localStorage.setItem("faculties", JSON.stringify(newFaculties));
    toast.success(
      `Removed ${offDay} Successfully From ${selectedFacultyState}`
    );
  };

  const removeSubject = (subject) => {
    let newFaculties = { ...faculties };
    let newSubjects = newFaculties[selectedFacultyState].subjects.filter(
      (item) => item !== subject
    );
    newFaculties[selectedFacultyState].subjects = newSubjects;
    setFaculties(newFaculties);
    localStorage.setItem("faculties", JSON.stringify(newFaculties));
    toast.success(
      `Removed ${subject} Successfully From ${selectedFacultyState}`
    );
  };

  function deleteFaculty() {
    let newFaculties = { ...faculties };
    setSelectedFacultyState(false);
    selectedFaculty.current.value = "default";
    delete newFaculties[selectedFacultyState];
    setFaculties(newFaculties);
    localStorage.setItem("faculties", JSON.stringify(newFaculties));
    localStorage.removeItem("classRoomState");
    setClassRoomsState([
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ]);
    setFacultiesState([]);
    localStorage.removeItem("facultiesState");
    setFinalTimeTable([
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ]);
    localStorage.removeItem("finalTimeTable");
    toast.success(`Deleted ${selectedFacultyState} From System`);
    resetData();
  }

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
    setAllSubjects(newAllSubjects);
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
    getEverySubject();
  }, [branches]);

  useEffect(() => {
    getEverySubject();
  }, [faculties]);

  return (
    <div className={styles.container}>
      <h3 className={styles.createFacultyHeader}>Create a new faculty</h3>
      <div className={styles.facultyCreateContainer}>
        <input placeholder="Faculty Name" ref={facultyNameInputRef}></input>
        <button
          onClick={() => {
            createNewFaculty(facultyNameInputRef.current.value);
          }}
        >
          Create A new Faculty
        </button>
      </div>
      <h3 className={styles.modifyFacultyHeader}>Modify Existing Faculties</h3>
      <div className={styles.modifyContainer}>
        <label>Select A Faculty To Modify </label>
        <select
          ref={selectedFaculty}
          onChange={handleFacultyChange}
          defaultValue="default"
        >
          <option value="default" disabled>
            Please Select An Option
          </option>
          {Object.keys(faculties).map((faculty) => (
            <option value={faculty} key={faculty}>
              {faculty}
            </option>
          ))}
        </select>
        {selectedFacultyState ? (
          <div className={styles.marginTop}>
            <select ref={selectedOffDay} defaultValue="default">
              <option value="default" disabled>
                Please Select An Off Day
              </option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thrusday">Thrusday</option>
              <option value="Friday">Friday</option>
            </select>
            <button
              className={styles.selectButtons}
              onClick={() => {
                addOffDay();
              }}
            >
              +
            </button>
            <table className={styles.tableOffDayDisplay}>
              <thead>
                <tr>
                  <th>Off Days</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {faculties[selectedFacultyState].offDays.map((offDay) => (
                  <tr key={offDay}>
                    <td>{offDay}</td>
                    <td>
                      <img
                        src={closeSVG}
                        className={styles.close}
                        onClick={() => {
                          removeOffDay(offDay);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}

        {selectedFacultyState ? (
          <div className={styles.marginTop}>
            <select ref={selectedSubject} defaultValue="default">
              <option value="default" disabled>
                Please Select A Subject To Add
              </option>
              {allSubjects.map((subject) => (
                <option value={subject} key={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <button
              className={styles.selectButtons}
              onClick={() => {
                addSubject();
              }}
            >
              +
            </button>
            <table className={styles.tableOffDayDisplay}>
              <thead>
                <tr>
                  <th>Subject Name</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {faculties[selectedFacultyState].subjects.map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>
                      <img
                        src={closeSVG}
                        className={styles.close}
                        onClick={() => {
                          removeSubject(subject);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
      {selectedFacultyState ? (
        <div>
          <button
            className={styles.deleteFaculty}
            onClick={() => {
              deleteFaculty();
            }}
          >
            Delete Faculty From System
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MF;
