import { takeLatest } from "@redux-saga/core/effects";
import { START_QUEST_ACTION, STOP_QUEST_ACTION } from "../actions";
import { startQuestSaga } from "./start-quest.saga";
import { stopQuestSaga } from "./stop-quest.saga";

export function* questSaga() {
	yield takeLatest(START_QUEST_ACTION, startQuestSaga);
	yield takeLatest(STOP_QUEST_ACTION, stopQuestSaga);
}
