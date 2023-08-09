import styles from "../Styles/VTT.module.css";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

function VTT({ finalTimeTable, branches }) {
  const [timeTableType, setTimeTableType] = useState("default");
  const [timeTableFor, setTimeTableFor] = useState(false);

  function getSubjectDetails(periods) {
    for (let i = 0; i < periods.length; i++) {
      if (periods[i].branchName === timeTableFor) {
        return periods[i];
      }
    }
    return false;
  }
  return (
    <div className={styles.container}>
      <select
        defaultValue="default"
        onChange={(e) => {
          setTimeTableType(e.target.value);
        }}
      >
        <option value="default" disabled>
          Please Select An Option
        </option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="classRooms">Class Rooms</option>
      </select>

      {timeTableType === "student" ? (
        <select
          defaultValue="default"
          onChange={(e) => {
            setTimeTableFor(e.target.value);
          }}
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
      ) : (
        ""
      )}

      {timeTableFor ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>9 - 10</th>
              <th>10 - 11</th>
              <th>11 - 12</th>
              <th>12 - 1</th>
              <th>1 - 2</th>
              <th>2 - 3</th>
              <th>3 - 4</th>
              <th>4 - 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              {finalTimeTable[0].map((periods) => {
                let data = getSubjectDetails(periods);
                if (data) {
                  return (
                    <td
                      className={
                        data.isLab
                          ? styles.isLab
                          : data.isGrouped
                          ? styles.isGrouped
                          : ""
                      }
                    >
                      <div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label>{data.facultyName}</label>
                        </div>
                        <div>
                          <label>{data.room}</label>
                        </div>
                      </div>
                    </td>
                  );
                } else {
                  return <td></td>;
                }
              })}
            </tr>
            <tr>
              <td>Tuesday</td>
              {finalTimeTable[1].map((periods) => {
                let data = getSubjectDetails(periods);
                if (data) {
                  return (
                    <td
                      className={
                        data.isLab
                          ? styles.isLab
                          : data.isGrouped
                          ? styles.isGrouped
                          : ""
                      }
                    >
                      <div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label>{data.facultyName}</label>
                        </div>
                        <div>
                          <label>LR {data.room}</label>
                        </div>
                      </div>
                    </td>
                  );
                } else {
                  return <td></td>;
                }
              })}
            </tr>
            <tr>
              <td>Wednesday</td>
              {finalTimeTable[2].map((periods) => {
                let data = getSubjectDetails(periods);
                if (data) {
                  return (
                    <td
                      className={
                        data.isLab
                          ? styles.isLab
                          : data.isGrouped
                          ? styles.isGrouped
                          : ""
                      }
                    >
                      <div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label>{data.facultyName}</label>
                        </div>
                        <div>
                          <label>{data.room}</label>
                        </div>
                      </div>
                    </td>
                  );
                } else {
                  return <td></td>;
                }
              })}
            </tr>
            <tr>
              <td>Thrusday</td>
              {finalTimeTable[3].map((periods) => {
                let data = getSubjectDetails(periods);
                if (data) {
                  return (
                    <td
                      className={
                        data.isLab
                          ? styles.isLab
                          : data.isGrouped
                          ? styles.isGrouped
                          : ""
                      }
                    >
                      <div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label>{data.facultyName}</label>
                        </div>
                        <div>
                          <label>{data.room}</label>
                        </div>
                      </div>
                    </td>
                  );
                } else {
                  return <td></td>;
                }
              })}
            </tr>
            <tr>
              <td>Friday</td>
              {finalTimeTable[4].map((periods) => {
                let data = getSubjectDetails(periods);
                if (data) {
                  return (
                    <td
                      className={
                        data.isLab
                          ? styles.isLab
                          : data.isGrouped
                          ? styles.isGrouped
                          : ""
                      }
                    >
                      <div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label>{data.facultyName}</label>
                        </div>
                        <div>
                          <label>{data.room}</label>
                        </div>
                      </div>
                    </td>
                  );
                } else {
                  return <td></td>;
                }
              })}
            </tr>
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export default VTT;
