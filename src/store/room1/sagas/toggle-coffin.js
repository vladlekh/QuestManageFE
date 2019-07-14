export function* toggleCoffinSaga(socket) {
	// const state = yield call(room1Api.openBox);
	socket.emit('coffin.open')
	// console.log(state);
}
