import styles from "../Styles/HomePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../Components/NavigationBar";
import MCL from "./MCL";
import { useState, useEffect } from "react";
import MB from "./MB";
import MS from "./MS";
function HomePage() {
  const [classRooms, setClassRooms] = useState([]);
  const [labs, setLabs] = useState([]);
  const [branches, setBranches] = useState([]);

  const [displayMCL, setDisplayMCL] = useState(true);
  const [displayMB, setDisplayMB] = useState(false);
  const [displayMS, setDisplayMS] = useState(false);

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
            subjectName: "Arabic",
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
            subjectName: "Arabic",
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
            subjectName: "Arabic",
            totalHours: 1,
            isGrouped: false,
            groupedWith: [],
            isLab: false,
            requiredClass: "Any",
          },
        ],
      },
    };
    setClassRooms(testClassrooms);
    setLabs(testLabs);
    setBranches(testBranches);
    localStorage.setItem("classRooms", JSON.stringify(testClassrooms));
    localStorage.setItem("labs", JSON.stringify(testLabs));
    localStorage.setItem("branches", JSON.stringify(testBranches));
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
      />
      {displayMCL ? (
        <MCL
          setClassRooms={setClassRooms}
          setLabs={setLabs}
          classRooms={classRooms}
          labs={labs}
        />
      ) : (
        <></>
      )}
      {displayMB ? <MB branches={branches} setBranches={setBranches} /> : <></>}
      {displayMS ? (
        <MS
          branches={branches}
          setBranches={setBranches}
          classRooms={classRooms}
          labs={labs}
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
