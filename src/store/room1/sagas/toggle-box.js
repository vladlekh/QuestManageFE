export function* toggleBoxSaga(socket) {
	// const state = yield call(room1Api.openBox);
	socket.emit('box.open')
	// console.log(state);
}
