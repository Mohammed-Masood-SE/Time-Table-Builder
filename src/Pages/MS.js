import styles from "../Styles/MS.module.css";
import { useRef, useState, useEffect } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";
function MS({ branches, setBranches, classRooms, labs, resetData }) {
  const selectedBranch = useRef(null);
  const [selectedBranchState, setSelectedBranchState] = useState(false);
  const subjectNameInputRef = useRef(false);
  const THPWInputRef = useRef(false);
  const requiredRoomInputRef = useRef(false);
  const isGroupedInputRef = useRef(false);
  const [isGroupedState, setIsGroupedState] = useState(false);
  const addGroupInputRef = useRef(false);
  const [groupsState, setGroupsState] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
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
    setAllSubjects(newAllSubjects);
  }

  useEffect(() => {
    getEverySubject();
  }, [branches]);

  useEffect(() => {
    setGroupsState([]);
    isGroupedInputRef.current.checked = false;
    setIsGroupedState(false);
  }, [selectedBranchState]);
  const handleBranchChange = () => {
    const selectedValue = selectedBranch.current.value;
    setSelectedBranchState(selectedValue);
  };
  return (
    <div className={styles.container}>
      <div className={styles.selectBranchInputContainer}>
        <label className={styles.whiteLable}>Select Branch </label>
        <select
          className={styles.dropDown}
          ref={selectedBranch}
          onChange={handleBranchChange}
          defaultValue="default"
        >
          <option value="default" disabled>
            Please Select An Option
          </option>
          {Object.keys(branches).map((branch) => (
            <option value={branch} key={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      <div>
        <table
          className={selectedBranchState ? styles.tableDisplay : styles.hidden}
        >
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Total Hours Per Week</th>
              <th>Required Room</th>
              <th>Is Grouped</th>
              <th>Grouped With</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {selectedBranchState ? (
              branches[selectedBranchState].subjects.map((subject) => (
                <tr
                  key={subject.subjectName}
                  className={
                    subject.isLab
                      ? styles.lab
                      : subject.isGrouped
                      ? styles.groupedClass
                      : styles.normalClass
                  }
                >
                  <td>{subject.subjectName}</td>
                  <td>{subject.totalHours}</td>
                  <td>{subject.requiredClass}</td>
                  <td>{subject.isGrouped ? "Yes" : "No"}</td>
                  <td>{subject.groupedWith.join(", ")}</td>
                  <td>
                    <img
                      src={closeSVG}
                      className={styles.close}
                      onClick={() => {
                        let updatedBranches = { ...branches };
                        let subjects =
                          updatedBranches[selectedBranchState].subjects;
                        const filteredSubjects = subjects.filter(
                          (subjectX) =>
                            subjectX.subjectName !== subject.subjectName
                        );
                        updatedBranches[selectedBranchState].subjects =
                          filteredSubjects;
                        setBranches(updatedBranches);
                        toast.success(
                          `Removed ${subject.subjectName} For ${selectedBranchState}`
                        );
                        resetData();
                        //REMOVE IF CLASS IS GROUPED FOR EVERY GROUPED CLASS
                        if (subject.isGrouped) {
                          for (let i = 0; i < subject.groupedWith.length; i++) {
                            let tempSubjects =
                              updatedBranches[subject.groupedWith[i]].subjects;
                            const tempFilteredSubjects = tempSubjects.filter(
                              (subjectX) =>
                                subjectX.subjectName !== subject.subjectName
                            );
                            updatedBranches[subject.groupedWith[i]].subjects =
                              tempFilteredSubjects;
                          }
                          toast.warn(
                            `Also Removed ${
                              subject.subjectName
                            } For ${subject.groupedWith.join(",")}`
                          );
                        }
                        localStorage.setItem(
                          "branches",
                          JSON.stringify(updatedBranches)
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={selectedBranchState ? styles.subjectAdder : styles.hidden}
      >
        <div>
          <h3 className={styles.subjectAdderHeading}>Create A New Subject</h3>
          <input
            placeholder="Subject Name"
            className={styles.primaryInputs}
            ref={subjectNameInputRef}
          ></input>
          <input
            type="number"
            placeholder="Total Hours Per Week"
            className={styles.primaryInputs}
            ref={THPWInputRef}
          ></input>
          <div className={styles.requiredRoomInputContainer}>
            <label className={styles.whiteLable}>Select Required Room</label>
            <select
              className={styles.dropDown}
              ref={requiredRoomInputRef}
              defaultValue="Any"
            >
              <option value="Any">Any</option>
              {classRooms.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
              {labs.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.isGroupedInputContainer}>
          <input
            type="checkbox"
            ref={isGroupedInputRef}
            onChange={() => {
              setIsGroupedState(isGroupedInputRef.current.checked);
            }}
          ></input>
          <label className={styles.groupedLable}>
            Is Grouped With Other Classes ?
          </label>
        </div>
        <div className={isGroupedState ? styles.block : styles.hidden}>
          <select
            className={styles.selectGroups}
            ref={addGroupInputRef}
            defaultValue="default"
          >
            <option value="default" disabled>
              Please Select An Option
            </option>
            {Object.keys(branches).map((branch) => {
              if (branch !== selectedBranchState) {
                return (
                  <option value={branch} key={branch}>
                    {branch}
                  </option>
                );
              }
            })}
          </select>
          <button
            className={styles.selectGroupsButton}
            onClick={() => {
              if (
                addGroupInputRef.current.value !== "default" &&
                !groupsState.includes(addGroupInputRef.current.value)
              ) {
                let newArr = [...groupsState];
                newArr.push(addGroupInputRef.current.value);
                setGroupsState(newArr);
              } else {
                if (addGroupInputRef.current.value === "default") {
                  toast.error(`Please Select A Branch To Group With`);
                } else {
                  toast.error(`Branch Already Grouped`);
                }
              }
            }}
          >
            Add
          </button>
          <table
            className={
              groupsState.length > 0 ? styles.tableGroupDisplay : styles.hidden
            }
          >
            <thead>
              <tr>
                <th>Grouped With</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {groupsState.map((group) => (
                <tr key={group}>
                  <td>{group}</td>
                  <td>
                    <img
                      src={closeSVG}
                      className={styles.close}
                      onClick={() => {
                        const updatedGroupsState = groupsState.filter(
                          (item) => item !== group
                        );
                        setGroupsState(updatedGroupsState);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            className={styles.addAsSubject}
            onClick={() => {
              if (!subjectNameInputRef.current.value) {
                toast.error("Please Enter Subject Name");
                return;
              }
              if (!THPWInputRef.current.value) {
                toast.error("Please Enter Total Hours Per Week");
                return;
              }
              if (
                isGroupedInputRef.current.checked &&
                groupsState.length === 0
              ) {
                toast.error("You Selected Grouped , But Did Not Group Any");
                return;
              }
              if (allSubjects.includes(subjectNameInputRef.current.value)) {
                toast.error(
                  "Subject With That Name Already Exists In Some Branch , Please Change The Name"
                );
                return;
              }
              if (!classRooms.includes(requiredRoomInputRef.current.value)) {
                if (requiredRoomInputRef.current.value !== "Any") {
                  toast.error(
                    "You Clicked Add As Subject , But Slected Required Classroom Which Is A Lab"
                  );
                  return;
                }
              }
              let tempSubject = {
                subjectName: subjectNameInputRef.current.value,
                totalHours: THPWInputRef.current.value,
                isGrouped: isGroupedInputRef.current.checked,
                groupedWith: isGroupedInputRef.current.checked
                  ? groupsState
                  : [],
                isLab: false,
                requiredClass: requiredRoomInputRef.current.value,
              };
              let newBranch = { ...branches };
              let newSubjects = [...newBranch[selectedBranchState].subjects];
              newSubjects.push(tempSubject);
              newBranch[selectedBranchState].subjects = newSubjects;
              if (isGroupedInputRef.current.checked) {
                for (let i = 0; i < groupsState.length; i++) {
                  let newGroupsState = groupsState.filter(
                    (item) => item !== groupsState[i]
                  );
                  newGroupsState.push(selectedBranchState);
                  let tempSubject2 = {
                    subjectName: subjectNameInputRef.current.value,
                    totalHours: THPWInputRef.current.value,
                    isGrouped: isGroupedInputRef.current.checked,
                    groupedWith: newGroupsState,
                    isLab: false,
                    requiredClass: requiredRoomInputRef.current.value,
                  };
                  let newSubjects2 = [...newBranch[groupsState[i]].subjects];
                  newSubjects2.push(tempSubject2);
                  newBranch[groupsState[i]].subjects = newSubjects2;
                }
              }
              setBranches(newBranch);
              localStorage.setItem("branches", JSON.stringify(newBranch));
              toast.success("Added Successfully");
              resetData();
            }}
          >
            Add As Subject
          </button>
          <button
            className={styles.addAsLab}
            onClick={() => {
              if (!subjectNameInputRef.current.value) {
                toast.error("Please Enter Subject Name");
                return;
              }
              if (!THPWInputRef.current.value) {
                toast.error("Please Enter Total Hours Per Week");
                return;
              }
              if (isGroupedInputRef.current.checked) {
                toast.error("Grouping Labs Is Not Allowed");
                return;
              }
              if (
                allSubjects.includes(subjectNameInputRef.current.value + " LAB")
              ) {
                toast.error(
                  "Lab With That Name Already Exists In Some Branch , Please Change The Name"
                );
                return;
              }
              if (THPWInputRef.current.value % 2 !== 0) {
                toast.error(
                  "Our System Only Allows Even Total Hours For The Lab"
                );
                return;
              }
              if (requiredRoomInputRef.current.value === "Any") {
                toast.error("Labs Cannot Have The Required Classroom As 'Any'");
                return;
              }
              if (!labs.includes(requiredRoomInputRef.current.value)) {
                toast.error(
                  "You Clicked Add As Lab , But Slected Required Classroom Which Is Not A Lab"
                );
                return;
              }
              let tempSubject = {
                subjectName: subjectNameInputRef.current.value + " LAB",
                totalHours: THPWInputRef.current.value,
                isGrouped: false,
                groupedWith: [],
                isLab: true,
                requiredClass: requiredRoomInputRef.current.value,
              };
              let newBranch = { ...branches };
              let newSubjects = [...newBranch[selectedBranchState].subjects];
              newSubjects.push(tempSubject);
              newBranch[selectedBranchState].subjects = newSubjects;
              // for grouped Lab (Not Implementing)
              // for (let i = 0; i < groupsState.length; i++) {
              //   let newGroupsState = groupsState.filter(
              //     (item) => item !== groupsState[i]
              //   );
              //   newGroupsState.push(selectedBranchState);
              //   let tempSubject2 = {
              //     subjectName: subjectNameInputRef.current.value + " LAB",
              //     totalHours: THPWInputRef.current.value,
              //     isGrouped: isGroupedInputRef.current.checked,
              //     groupedWith: newGroupsState,
              //     isLab: true,
              //     requiredClass: requiredRoomInputRef.current.value,
              //   };
              //   let newSubjects2 = [...newBranch[groupsState[i]].subjects];
              //   newSubjects2.push(tempSubject2);
              //   newBranch[groupsState[i]].subjects = newSubjects2;
              // }
              setBranches(newBranch);
              localStorage.setItem("branches", JSON.stringify(newBranch));
              toast.success("Added Successfully");
              resetData();
            }}
          >
            Add As Lab
          </button>
        </div>
      </div>
      <div style={{ height: "2rem" }}></div>
    </div>
  );
}

export default MS;
