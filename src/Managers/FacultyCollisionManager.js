class FacultyCollisionManager {
  checkIfFacultyFree(state, facultyName, i, j) {
    let newState = [...state];
    if (newState[i][j].includes(facultyName)) {
      return false;
    } else {
      return true;
    }
  }

  bookFaculty(state, facultyName, i, j) {
    let newState = [...state];
    if (newState[i][j].includes(facultyName)) {
      return newState;
    }
    newState[i][j].push(facultyName);
    return newState;
  }
}

export default FacultyCollisionManager;
