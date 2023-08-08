class ClassRoomCollisionManager {
  getFreeClassRoom(state, allClassRooms, i, j, requiredClassRoom) {
    let availableClassrooms = [...allClassRooms];
    for (let k = 0; k < state[i][j].length; k++) {
      availableClassrooms = availableClassrooms.filter(
        (room) => room !== state[i][j][k]
      );
    }
    if (requiredClassRoom === "Any") {
      return availableClassrooms;
    } else {
      if (availableClassrooms.includes(requiredClassRoom)) {
        return [requiredClassRoom];
      } else {
        return [];
      }
    }
  }

  bookClassRoom(state, roomNumber, i, j) {
    let newState = [...state];
    if (newState[i][j].includes(roomNumber)) {
      return newState;
    }
    newState[i][j].push(roomNumber);
    return newState;
  }

  freeUpClassRoom(state, roomNumber, i, j) {
    let newState = [...state];
    newState[i][j] = newState[i][j].filter((x) => x !== roomNumber);
    return newState;
  }
}

export default ClassRoomCollisionManager;
