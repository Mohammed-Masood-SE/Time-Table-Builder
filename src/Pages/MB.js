import styles from "../Styles/MB.module.css";
import { useRef } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";
function MB({ branches, setBranches }) {
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
          <input
            className={styles.inputs}
            placeholder="Enter Branch Name"
            ref={branchInputRef}
          ></input>
          <button
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
          <div>
            <h3>Available Branches</h3>
            {Object.keys(branches).map((branch) => (
              <div key={branch} className={styles.roomHolder}>
                <p>{branch}</p>
                <img
                  src={closeSVG}
                  className={styles.close}
                  onClick={() => {
                    const newBranchState = { ...branches };
                    delete newBranchState[branch];
                    localStorage.setItem(
                      "branches",
                      JSON.stringify(newBranchState)
                    );
                    setBranches(newBranchState);
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

export default MB;
