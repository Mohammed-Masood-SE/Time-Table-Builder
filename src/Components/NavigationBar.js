import styles from "../Styles/NavigationBar.module.css";
import { useState } from "react";
function NavigationBar({
  setDisplayMCL,
  setDisplayMB,
  setDisplayMS,
  setDisplayMF,
  setDisplayBTT,
  setDisplayVTT,
}) {
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
            setDisplayMF(false);
            setDisplayBTT(false);
            setDisplayVTT(false);
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
            setDisplayMF(false);
            setDisplayBTT(false);
            setDisplayVTT(false);
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
            setDisplayMF(false);
            setDisplayBTT(false);
            setDisplayVTT(false);
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
          onClick={() => {
            setSelectedNav(3);
            setDisplayMCL(false);
            setDisplayMB(false);
            setDisplayMS(false);
            setDisplayMF(true);
            setDisplayBTT(false);
            setDisplayVTT(false);
          }}
        >
          Modify Faculty
        </button>
        <button
          className={
            selectedNav === 4
              ? styles.selectedNav
              : styles.customNavigationButton
          }
          onClick={() => {
            setSelectedNav(4);
            setDisplayMCL(false);
            setDisplayMB(false);
            setDisplayMS(false);
            setDisplayMF(false);
            setDisplayBTT(true);
            setDisplayVTT(false);
          }}
        >
          Build Time Tables
        </button>
        <button
          className={
            selectedNav === 5
              ? styles.selectedNav
              : styles.customNavigationButton
          }
          onClick={() => {
            setSelectedNav(5);
            setDisplayMCL(false);
            setDisplayMB(false);
            setDisplayMS(false);
            setDisplayMF(false);
            setDisplayBTT(false);
            setDisplayVTT(true);
          }}
        >
          View Timeables
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;
