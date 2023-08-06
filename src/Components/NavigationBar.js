import styles from "../Styles/NavigationBar.module.css";
import { useState } from "react";
function NavigationBar({ setDisplayMCL, setDisplayMB, setDisplayMS }) {
  const [selectedNav, setSelectedNav] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <button
          className={
            selectedNav === 0
              ? styles.selectedNav
              : styles.customNavigationButton
          }
          onClick={() => {
            setSelectedNav(0);
            setDisplayMCL(true);
            setDisplayMB(false);
            setDisplayMS(false);
          }}
        >
          Modify Classrooms & Labs
        </button>
        <button
          className={
            selectedNav === 1
              ? styles.selectedNav
              : styles.customNavigationButton
          }
          onClick={() => {
            setSelectedNav(1);
            setDisplayMCL(false);
            setDisplayMB(true);
            setDisplayMS(false);
          }}
        >
          Modify Branch
        </button>
        <button
          className={
            selectedNav === 2
              ? styles.selectedNav
              : styles.customNavigationButton
          }
          onClick={() => {
            setSelectedNav(2);
            setDisplayMCL(false);
            setDisplayMB(false);
            setDisplayMS(true);
          }}
        >
          Modify Subjects
        </button>
        <button
          className={
            selectedNav === 3
              ? styles.selectedNav
              : styles.customNavigationButton
          }
        >
          Modify Faculty
        </button>
        <button
          className={
            selectedNav === 4
              ? styles.selectedNav
              : styles.customNavigationButton
          }
        >
          Build Time Tables
        </button>
        <button
          className={
            selectedNav === 5
              ? styles.selectedNav
              : styles.customNavigationButton
          }
        >
          View Timeables
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;
