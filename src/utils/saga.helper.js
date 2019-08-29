import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import io from "socket.io-client";
import { reduce } from "lodash";
import { ActionHelper } from "./action.helper";
import { portAction } from "../store/app/actions";
import { switchLightAction } from "../store/light/actions/switch-light.action";

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
			const action = yield take(socketChannel);
			yield put(action);
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
			console.log('HANDLER', data, socket);
			emit(data);
		};
		socket.on('light', () => handler(switchLightAction()));
		reduce(controls, (acc, { socketReply, actionReply, ...c }) => {
			socket.on(socketReply, () => handler({ type: actionReply }));
			socket.on('port_disconnected', ({ path }) => handler(portAction({
				success: false,
				port: path,
				message: 'Отключен'
			})));
			socket.on('port_connected', ({ path }) => handler(portAction({
				success: true,
				port: path,
				message: 'Подключен'
			})));
			return acc;
		}, {});
		return () => {
			socket.close();
		};
	});

	static sagaEmitter = function* (socket, name) {
		yield takeLatest(ActionHelper.createEmitActionType(name), SagaHelper.emit, socket);
		yield takeLatest(ActionHelper.EMIT_ACTION, SagaHelper.emit, socket);
	};

	static emit = function (socket, { payload }) {
		console.log('PAYLOAD', payload);
		socket.emit(payload.event, payload.data);
	}
}
