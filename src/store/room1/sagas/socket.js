import io from 'socket.io-client';
import { call, take, fork, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import { room1Saga } from "./index";
import { BOX_IS_OPENED_ACTION, boxIsOpenedAction } from "../actions";
import { COFFIN_IS_OPENED_ACTION } from "../actions/coffin-is-opened";
const socketServerURL = 'http://localhost:1081/room1';

// wrapping function for socket.on
const connect = () => {
	const socket = io(socketServerURL);
	return new Promise((resolve) => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
};

// This is how a channel is created
const createSocketChannel = socket => eventChannel((emit) => {
	const handler = (data) => {
		emit(data);
	};
	socket.on('boxIsOpened', () => handler(BOX_IS_OPENED_ACTION));
	socket.on('coffinIsOpened', () => handler(COFFIN_IS_OPENED_ACTION));
	return () => {
		socket.close();
	};
});

// saga that listens to the socket and puts the new data into the reducer
export const listenServerSaga = function* () {

	// connect to the server
	const socket = yield call(connect);

	// then create a socket channel
	const socketChannel = yield call(createSocketChannel, socket);

	yield fork(room1Saga, socket);

	// then put the new data into the reducer
	while (true) {
		const payload = yield take(socketChannel);
		console.log(payload);
		yield put({ type: payload });
	}
};
