import { takeLatest } from "@redux-saga/core/effects";
import { START_QUEST_ACTION } from "../actions";
import { startQuestSaga } from "./start-quest.saga";

export function* questSaga() {
	yield takeLatest(START_QUEST_ACTION, startQuestSaga);
}
