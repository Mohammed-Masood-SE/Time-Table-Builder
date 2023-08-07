import styles from "../Styles/BTT.module.css";
import { useRef, useState, useEffect } from "react";
import closeSVG from "../Icons/close.svg";
import { toast } from "react-toastify";

function BTT({ branches, faculties }) {
  const [allSubjectsPicked, setAllSubjectsPicked] = useState([]);

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
    getEverySubject();
  }, [branches, faculties]);

  return (
    <div className={styles.container}>
      {allSubjectsPicked.length === 0 ? (
        <div></div>
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
