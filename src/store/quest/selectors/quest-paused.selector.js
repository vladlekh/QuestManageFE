import { createSelector } from "reselect";
import { selectQuestStatus } from "./quest-status.selector";

export const selectQuestPaused = createSelector(
	selectQuestStatus,
	status => !!status.paused
);
