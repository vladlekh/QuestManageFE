import { createSelector } from "reselect";
import { selectQuestStatus } from "./quest-status.selector";

export const selectQuestStarted = createSelector(
	selectQuestStatus,
	status => !!status.started
);
