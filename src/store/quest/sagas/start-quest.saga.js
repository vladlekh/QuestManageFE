import { put, select } from "@redux-saga/core/effects";
import { ActionHelper } from "../../../utils/action.helper";
import { turnOnLightAction } from "../../light/actions";
import { selectQuestPersons } from "../selectors";

export function* startQuestSaga() {
	const persons = yield select(selectQuestPersons);
	yield put(ActionHelper.emit(ActionHelper.eventEnum.setPersons, persons));
	yield put(turnOnLightAction());
}
