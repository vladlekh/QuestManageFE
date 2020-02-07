import { put, select, call } from "@redux-saga/core/effects";
import { ActionHelper } from "../../../utils/action.helper";
import { RouterHelper } from "../../../utils/router.helper";
import { startLightAction } from '../../light/actions';
import { selectQuestPersons } from "../selectors";

export function* startQuestSaga() {
	const persons = yield select(selectQuestPersons);
	yield put(ActionHelper.emit(ActionHelper.eventEnum.setPersons, persons));
	yield call(RouterHelper.goToFirstRoom);
	yield put(startLightAction());
}
