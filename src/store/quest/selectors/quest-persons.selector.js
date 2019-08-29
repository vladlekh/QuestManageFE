import { createSelector } from "reselect";
import { selectQuestStatus } from "./quest-status.selector";

export const selectQuestPersons = createSelector(
	selectQuestStatus,
	status => status.persons || 0
);
