import { call, put } from 'redux-saga/effects';
import { AppApi } from "../../../api";
import { ReducerHelper } from "../../../utils/reducer.helper";
import { store } from "../../store";
import { createSagaAction, getStructureSuccessfulAction } from "../actions";

export function* getStructureSaga() {
	try {
		const config = yield call(AppApi.getConfig);
		store.attachReducers({ rooms: ReducerHelper.createReducer(config)});
		yield put(createSagaAction());
		yield put(getStructureSuccessfulAction(config));
	} catch (e) {
		alert(e);
	}
}
