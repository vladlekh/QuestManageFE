import { createSelector } from "reselect";
import { selectQuestStatus } from "./quest-status.selector";

export const selectQuestIsInitialized = createSelector(
	selectQuestStatus,
	({ initialized }) => !!initialized,
);
