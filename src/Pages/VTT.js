import styles from "../Styles/VTT.module.css";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

function VTT({ finalTimeTable, branches, faculties, classRooms, labs }) {
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

  function getFacultyDetails(periods) {
    for (let i = 0; i < periods.length; i++) {
      if (periods[i].facultyName === timeTableFor) {
        return periods[i];
      }
    }
    return false;
  }

  function checkIfRoomFree(periods) {
    for (let i = 0; i < periods.length; i++) {
      if (periods[i].room === timeTableFor) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className={styles.container}>
      <select
        defaultValue="default"
        onChange={(e) => {
          setTimeTableType(e.target.value);
          setTimeTableFor(false);
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
            Please Select A Branch
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

      {timeTableType === "student" && timeTableFor ? (
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
                          <label className={styles.room}>{data.room}</label>
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
                          <label className={styles.room}>{data.room}</label>
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
                          <label className={styles.room}>{data.room}</label>
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
                          <label className={styles.room}>{data.room}</label>
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
                          <label className={styles.room}>{data.room}</label>
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

      {timeTableType === "faculty" ? (
        <select
          defaultValue="default"
          onChange={(e) => {
            setTimeTableFor(e.target.value);
          }}
        >
          <option value="default" disabled>
            Please Select A Faculty
          </option>
          {Object.keys(faculties).map((faculty) => (
            <option value={faculty} key={faculty}>
              {faculty}
            </option>
          ))}
        </select>
      ) : (
        ""
      )}

      {timeTableType === "faculty" && timeTableFor ? (
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
                let data = getFacultyDetails(periods);
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
                          <label>{data.branchName}</label>
                        </div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label className={styles.room}>{data.room}</label>
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
                let data = getFacultyDetails(periods);
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
                          <label>{data.branchName}</label>
                        </div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label className={styles.room}>{data.room}</label>
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
                let data = getFacultyDetails(periods);
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
                          <label>{data.branchName}</label>
                        </div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label className={styles.room}>{data.room}</label>
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
                let data = getFacultyDetails(periods);
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
                          <label>{data.branchName}</label>
                        </div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label className={styles.room}>{data.room}</label>
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
                let data = getFacultyDetails(periods);
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
                          <label>{data.branchName}</label>
                        </div>
                        <div>
                          <label>{data.subjectName}</label>
                        </div>
                        <div>
                          <label className={styles.room}>{data.room}</label>
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

      {timeTableType === "classRooms" ? (
        <select
          defaultValue="default"
          onChange={(e) => {
            setTimeTableFor(e.target.value);
          }}
        >
          <option value="default" disabled>
            Please Select A Room Number
          </option>
          {classRooms.map((room) => (
            <option value={room} key={room}>
              {room}
            </option>
          ))}
          {labs.map((lab) => (
            <option value={lab} key={lab}>
              {lab}
            </option>
          ))}
        </select>
      ) : (
        ""
      )}

      {timeTableType === "classRooms" && timeTableFor ? (
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
                let data = checkIfRoomFree(periods);
                if (data) {
                  return (
                    <td className={styles.available}>
                      <div>
                        <label>Available</label>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td className={styles.booked}>
                      <div>
                        <label>Booked</label>
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
            <tr>
              <td>Tuesday</td>
              {finalTimeTable[1].map((periods) => {
                let data = checkIfRoomFree(periods);
                if (data) {
                  return (
                    <td className={styles.available}>
                      <div>
                        <label>Available</label>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td className={styles.booked}>
                      <div>
                        <label>Booked</label>
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
            <tr>
              <td>Wednesday</td>
              {finalTimeTable[2].map((periods) => {
                let data = checkIfRoomFree(periods);
                if (data) {
                  return (
                    <td className={styles.available}>
                      <div>
                        <label>Available</label>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td className={styles.booked}>
                      <div>
                        <label>Booked</label>
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
            <tr>
              <td>Thrusday</td>
              {finalTimeTable[3].map((periods) => {
                let data = checkIfRoomFree(periods);
                if (data) {
                  return (
                    <td className={styles.available}>
                      <div>
                        <label>Available</label>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td className={styles.booked}>
                      <div>
                        <label>Booked</label>
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
            <tr>
              <td>Friday</td>
              {finalTimeTable[4].map((periods) => {
                let data = checkIfRoomFree(periods);
                if (data) {
                  return (
                    <td className={styles.available}>
                      <div>
                        <label>Available</label>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td className={styles.booked}>
                      <div>
                        <label>Booked</label>
                      </div>
                    </td>
                  );
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
