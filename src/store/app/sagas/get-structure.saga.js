import { call, put } from 'redux-saga/effects';
import { AppApi } from "../../../api";
import { ReducerHelper } from "../../../utils/reducer.helper";
import { store } from "../../store";
import { createSagaAction, getStructureSuccessfulAction } from "../actions";
import { loadAudioListAction } from '../../audio/actions';

export function* getStructureSaga() {
	try {
		const config = yield call(AppApi.getConfig);
		const ports = yield call(AppApi.getPortsList);
		store.attachReducers({ ports: ReducerHelper.createPortsReducer(ports)});
		store.attachReducers({ rooms: ReducerHelper.createRoomReducer(config)});
		yield put(createSagaAction());
		yield put(getStructureSuccessfulAction(config));
		yield put(loadAudioListAction());
	} catch (e) {
		alert(e);
	}
}
