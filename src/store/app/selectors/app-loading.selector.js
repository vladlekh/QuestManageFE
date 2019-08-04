import { createSelector } from "reselect";
import { selectApp } from "./app.selector";

export const selectAppLoading = createSelector(
	selectApp,
	app => app.loading,
);
