import { createSelector } from "reselect";
import { selectApp } from "./app.selector";

export const selectAppConfig = createSelector(
	selectApp,
	app => app.config
);
