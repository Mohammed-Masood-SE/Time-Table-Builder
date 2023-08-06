import styles from "../Styles/MCL.module.css";
import { useRef } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";
function MCL({ setLabs, setClassRooms, labs, classRooms }) {
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
            onClick={() => {
              if (
                classroomInputRef.current.value &&
                !classRooms.includes(classroomInputRef.current.value)
              ) {
                const newArray = [...classRooms];
                newArray.push(classroomInputRef.current.value);
                localStorage.setItem("classRooms", JSON.stringify(newArray));
                setClassRooms(newArray);
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
            <h3>Available Classrooms</h3>
            {classRooms.map((room) => (
              <div key={room} className={styles.roomHolder}>
                <p>{room}</p>
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
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <input
            placeholder="Enter Lab Number"
            className={styles.inputs}
            ref={labInputRef}
          ></input>
          <button
            onClick={() => {
              if (
                labInputRef.current.value &&
                !labs.includes(labInputRef.current.value)
              ) {
                const newArray = [...labs];
                newArray.push(labInputRef.current.value);
                localStorage.setItem("labs", JSON.stringify(newArray));
                setLabs(newArray);
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
            <h3>Available Labs</h3>
            {labs.map((room) => (
              <div key={room} className={styles.roomHolder}>
                <p>{room}</p>
                <img
                  src={closeSVG}
                  className={styles.close}
                  onClick={() => {
                    const updatedRooms = labs.filter((r) => r !== room);
                    localStorage.setItem("labs", JSON.stringify(updatedRooms));
                    setLabs(updatedRooms);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCL;
