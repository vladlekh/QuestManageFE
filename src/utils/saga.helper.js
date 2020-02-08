import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import io from "socket.io-client";
import { reduce } from "lodash";
import { ActionHelper } from "./action.helper";
import { switchLightAction } from "../store/light/actions/switch-light.action";
import { portReadyAction, portConnectionAction } from '../store/ports/actions';
import { FIXED_REPLIES, ROOMS, SOUND_EFFECTS } from '../constants';
import { FIXED_NAMES } from '../constants/fixed-names';
import { playSoundEffect, stopAudioSmoothly } from '../middleware/audio.actions';

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

	static createSocketChannel = (socket, { controls, name: roomName }) => eventChannel((emit) => {
		const handler = (data) => {
			console.log('HANDLER', data, socket);
			emit(data);
		};
		socket.on('light', () => handler(switchLightAction()));
		socket.on('port_disconnected', ({ path }) => handler(portConnectionAction({
			success: false,
			port: path,
			message: 'Отключен'
		})));
		socket.on('port_connected', ({ path }) => handler(portConnectionAction({
			success: true,
			port: path,
			message: 'Подключен'
		})));
		socket.on('arduinoStarted', ({ path }) => handler(portReadyAction(path)));

		reduce(controls, (acc, { socketReply, actionReply, ...c }) => {
			if (roomName === ROOMS.room5 && c.name === FIXED_NAMES.chair) {
				socket.on(FIXED_REPLIES.waterflow, () => {
					socket.emit("water.flow");
				})
			}
			if (roomName === ROOMS.room5 && c.name === FIXED_NAMES.rfidAccess) {
				socket.on(socketReply, () => {
					socket.emit("rfid.accessed");
				})
			}
			// if (roomName === ROOMS.room2 && c.name === FIXED_NAMES.signaling) {
			// 	socket.on(FIXED_REPLIES.lightSignaling, () => handler(playSoundEffect(SOUND_EFFECTS.signaling, true)));
			// }
			// if (roomName === ROOMS.room2 && c.name === FIXED_NAMES.signalingstop) {
			// 	socket.on(FIXED_REPLIES.lightSignalingIsStopped, () => handler(stopAudioSmoothly(SOUND_EFFECTS.signaling)));
			// }
			if (roomName === ROOMS.room3 && c.name === FIXED_NAMES.coffin) {
				socket.on(FIXED_REPLIES.coffinIsOpened, () => handler(playSoundEffect(SOUND_EFFECTS.bricks)));
			}
			if (roomName === ROOMS.room3 && c.name === FIXED_NAMES.coffinSlide) {
				socket.on(FIXED_REPLIES.thirdDoorIsOpened, () => handler(playSoundEffect(SOUND_EFFECTS.coffinSlide)));
			}
			if (roomName === ROOMS.room4 && c.name === FIXED_NAMES.safeUp) {
				socket.on(FIXED_REPLIES.safeUpAllowed, () => handler(playSoundEffect(SOUND_EFFECTS.lock)));
			}
			if (roomName === ROOMS.room4 && c.name === FIXED_NAMES.lion) {
				socket.on(FIXED_REPLIES.lionIsOpened, () => handler(playSoundEffect(SOUND_EFFECTS.lion)));
			}
			if (roomName === ROOMS.room5 && c.name === FIXED_NAMES.chair) {
				socket.on(FIXED_REPLIES.chairIsOpened, () => handler(playSoundEffect(SOUND_EFFECTS.lock2)));
			}

			socket.on(socketReply, (data) => {
				console.log('DATA', data);
				handler({ type: actionReply })
			});
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
