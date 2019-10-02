import { createSelector } from "reselect";
import { selectPorts } from "./ports.selector";

export const selectPortsAreInitializing = createSelector(
	selectPorts,
	({ initializing }) => !!initializing
);
