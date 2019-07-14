import { call } from 'redux-saga/effects';
import { room1Api } from "../../../api";

export function* resetSaga(socket) {
	console.log('RESET');
	socket.emit('light.switch')
}
