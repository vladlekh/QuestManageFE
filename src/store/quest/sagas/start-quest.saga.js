import { put, select, call, delay } from "@redux-saga/core/effects";
import { ActionHelper } from "../../../utils/action.helper";
import { RouterHelper } from "../../../utils/router.helper";
import { startLightAction } from '../../light/actions';
import { selectQuestPersons } from "../selectors";

export function* startQuestSaga() {
	const persons = yield select(selectQuestPersons);
	yield put(ActionHelper.emit(ActionHelper.eventEnum.setPersons, persons));
	yield delay(5000);
	yield put(ActionHelper.emit(ActionHelper.eventEnum.startQuest));
	yield call(RouterHelper.goToFirstRoom);
	yield put(startLightAction());
}
