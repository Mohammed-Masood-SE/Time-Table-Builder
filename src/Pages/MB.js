import styles from "../Styles/MB.module.css";
import { useRef } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";
function MB({ branches, setBranches, resetData }) {
  const branchInputRef = useRef(null);
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
          <div className={styles.temp}>
            <input
              className={styles.inputs}
              placeholder="Enter Branch Name"
              ref={branchInputRef}
            ></input>
            <button
              className={styles.addButton}
              onClick={() => {
                if (
                  branchInputRef.current.value &&
                  !branches[branchInputRef.current.value]
                ) {
                  const newBranchName = branchInputRef.current.value;
                  const newBranchState = {
                    ...branches,
                    [newBranchName]: {
                      subjects: [],
                    },
                  };
                  localStorage.setItem(
                    "branches",
                    JSON.stringify(newBranchState)
                  );
                  setBranches(newBranchState);
                  resetData();
                  toast.success(
                    `Added Branch ${newBranchName} Successfully`,
                    errorToastOptions
                  );
                } else {
                  if (branchInputRef.current.value) {
                    toast.error("Branch Already Exists", errorToastOptions);
                  } else {
                    toast.error("Input Field Is Blank", errorToastOptions);
                  }
                }
              }}
            >
              +
            </button>
          </div>
          <div>
            <div className={styles.roomContainer}>
              {Object.keys(branches).map((branch) => (
                <div key={branch} className={styles.roomHolder}>
                  <p className={styles.roomNumber}>{branch}</p>
                  <img
                    src={closeSVG}
                    className={styles.close}
                    onClick={() => {
                      const newBranchState = { ...branches };
                      delete newBranchState[branch];
                      let keys = Object.keys(newBranchState);
                      for (let i = 0; i < keys.length; i++) {
                        let newSubjects = newBranchState[keys[i]].subjects;
                        for (let j = 0; j < newSubjects.length; j++) {
                          let newGroupedWith = newSubjects[
                            j
                          ].groupedWith.filter((item) => item !== branch);
                          newSubjects[j].groupedWith = newGroupedWith;
                          if (newGroupedWith.length === 0) {
                            newSubjects[j].isGrouped = false;
                          }
                        }
                        newBranchState[keys[i]].subjects = newSubjects;
                      }
                      localStorage.setItem(
                        "branches",
                        JSON.stringify(newBranchState)
                      );
                      setBranches(newBranchState);
                      resetData();
                      toast.success(`Removed Branch ${branch} Successfully`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "2rem" }}></div>
    </div>
  );
}

export default MB;
