import styles from "../Styles/MCL.module.css";
import { useRef } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";
function MCL({
  setLabs,
  setClassRooms,
  labs,
  classRooms,
  branches,
  setBranches,
  resetData,
}) {
  const classroomInputRef = useRef(null);
  const labInputRef = useRef(null);
  const errorToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputHolder}>
        <div>
          <input
            className={styles.inputs}
            placeholder="Enter Classroom Number"
            ref={classroomInputRef}
          ></input>
          <button
            className={styles.addButton}
            onClick={() => {
              if (
                classroomInputRef.current.value &&
                !classRooms.includes(classroomInputRef.current.value)
              ) {
                const newArray = [...classRooms];
                newArray.push(classroomInputRef.current.value);
                localStorage.setItem("classRooms", JSON.stringify(newArray));
                setClassRooms(newArray);
                toast.success(
                  `Added Classroom ${classroomInputRef.current.value} Successfully`
                );
                resetData();
              } else {
                if (classroomInputRef.current.value) {
                  toast.error(
                    "Class Already Created With Same Room Number",
                    errorToastOptions
                  );
                } else {
                  toast.error("Input Field Is Blank", errorToastOptions);
                }
              }
            }}
          >
            +
          </button>
          <div>
            <div className={styles.roomContainer}>
              {classRooms.map((room) => (
                <div key={room} className={styles.roomHolder}>
                  <p className={styles.roomNumber}>{room}</p>
                  <img
                    src={closeSVG}
                    className={styles.close}
                    onClick={() => {
                      const updatedRooms = classRooms.filter((r) => r !== room);
                      localStorage.setItem(
                        "classRooms",
                        JSON.stringify(updatedRooms)
                      );
                      setClassRooms(updatedRooms);
                      toast.success(`Removed Classroom ${room} Successfully`);
                      resetData();
                      const newBranchState = { ...branches };
                      let keys = Object.keys(newBranchState);
                      for (let i = 0; i < keys.length; i++) {
                        let newSubjects = newBranchState[keys[i]].subjects;
                        for (let j = 0; j < newSubjects.length; j++) {
                          if (newSubjects[j].requiredClass === room) {
                            newSubjects[j].requiredClass = "Any";
                          }
                        }
                        newBranchState[keys[i]].subjects = newSubjects;
                      }
                      setBranches(newBranchState);
                      localStorage.setItem(
                        "branches",
                        JSON.stringify(newBranchState)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <input
            placeholder="Enter Lab Number"
            className={styles.inputs}
            ref={labInputRef}
          ></input>
          <button
            className={styles.addButton}
            onClick={() => {
              if (
                labInputRef.current.value &&
                !labs.includes(labInputRef.current.value)
              ) {
                const newArray = [...labs];
                newArray.push(labInputRef.current.value);
                localStorage.setItem("labs", JSON.stringify(newArray));
                setLabs(newArray);
                toast.success(
                  `Added Lab ${labInputRef.current.value} Successfully`
                );
                resetData();
              } else {
                if (labInputRef.current.value) {
                  toast.error(
                    "Lab Already Created With Same Room Number",
                    errorToastOptions
                  );
                } else {
                  toast.error("Input Field Is Blank", errorToastOptions);
                }
              }
            }}
          >
            +
          </button>
          <div>
            <div className={styles.roomContainer}>
              {labs.map((room) => (
                <div key={room} className={styles.roomHolder}>
                  <p className={styles.roomNumber}>{room}</p>
                  <img
                    src={closeSVG}
                    className={styles.close}
                    onClick={() => {
                      const updatedRooms = labs.filter((r) => r !== room);
                      localStorage.setItem(
                        "labs",
                        JSON.stringify(updatedRooms)
                      );
                      setLabs(updatedRooms);
                      toast.success(`Removed Lab ${room} Successfully`);
                      resetData();
                      const newBranchState = { ...branches };
                      let keys = Object.keys(newBranchState);
                      for (let i = 0; i < keys.length; i++) {
                        let newSubjects = newBranchState[keys[i]].subjects;
                        for (let j = 0; j < newSubjects.length; j++) {
                          if (newSubjects[j].requiredClass === room) {
                            newSubjects[j].requiredClass = "Any";
                          }
                        }
                        newBranchState[keys[i]].subjects = newSubjects;
                      }
                      setBranches(newBranchState);

                      localStorage.setItem(
                        "branches",
                        JSON.stringify(newBranchState)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCL;
