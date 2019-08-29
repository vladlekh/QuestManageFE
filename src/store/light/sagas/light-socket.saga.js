import { call, fork, put, take, takeLatest } from "@redux-saga/core/effects";
import io from "socket.io-client";
import { eventChannel } from "@redux-saga/core";
import { ActionHelper } from "../../../utils/action.helper";
import { TURN_ON_LIGHT_ACTION } from "../actions";
import { SWITCH_LIGHT_ACTION } from "../actions/switch-light.action";

const SOCKET_SERVER_URL = 'http://localhost:1081';

export function* lightSocketSaga () {
	const socket = yield call(connect, 'light');

	// then create a socket channel
	const socketChannel = yield call(createSocketChannel, socket);

	yield fork(sagaEmitter, socket);

	// then put the new data into the reducer
	while (true) {
		const action = yield take(socketChannel);
		yield put(action);
	}
}

function connect(namespace) {
	const socket = io(`${SOCKET_SERVER_URL}/${namespace}`);
	return new Promise((resolve) => {
		socket.on('connect', () => {
			console.log('CONNECTED');
			resolve(socket);
		});
	});
}

function createSocketChannel (socket) {
	return eventChannel((emit) => {
		const handler = (data) => {
			emit(data);
		};
		socket.on('123', () => handler({ type: 'Action' }));
		return () => {
			socket.close();
		};
	});
}

function* sagaEmitter(socket) {
	yield takeLatest(TURN_ON_LIGHT_ACTION, emit, socket);
	yield takeLatest(SWITCH_LIGHT_ACTION, emit, socket);
	yield takeLatest(ActionHelper.EMIT_ACTION, emit, socket);
}

function emit(socket, { payload }) {
	console.log(`${payload.event}`);
	socket.emit(payload.event, payload.data);
}
