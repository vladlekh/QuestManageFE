import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import io from "socket.io-client";
import { reduce } from "lodash";
import { ActionHelper } from "./action.helper";

export class SagaHelper {
	static SOCKET_SERVER_URL = 'http://localhost:1081';

	static createSaga(room = {}) {
		return function* () {
			yield all([
				fork(SagaHelper.listenServerSaga, room)
			])
		}
	}

	static listenServerSaga = function* ({ namespace, ...room } = {}) {
		const socket = yield call(SagaHelper.connect, namespace);

		console.log(socket);

		// then create a socket channel
		const socketChannel = yield call(SagaHelper.createSocketChannel, socket, room);

		yield fork(SagaHelper.sagaEmitter, socket, room.name);

		// then put the new data into the reducer
		while (true) {
			const payload = yield take(socketChannel);
			yield put({ type: payload });
		}
	};

	static connect = (namespace) => {
		const socket = io(`${SagaHelper.SOCKET_SERVER_URL}/${namespace}`);
		return new Promise((resolve) => {
			socket.on('connect', () => {
				resolve(socket);
			});
		});
	};

	static createSocketChannel = (socket, { controls }) => eventChannel((emit) => {
		const handler = (data) => {
			emit(data);
		};
		reduce(controls, (acc, { socketReply, actionReply, ...c }) => {
			socket.on(socketReply, () => handler(actionReply));
			return acc;
		}, {});
		return () => {
			socket.close();
		};
	});

	static sagaEmitter = function* (socket, name) {
		yield takeLatest(ActionHelper.createEmitActionType(name), SagaHelper.emit, socket);
	};

	static emit = function (socket, { payload }) {
		socket.emit(payload.event);
	}
}
