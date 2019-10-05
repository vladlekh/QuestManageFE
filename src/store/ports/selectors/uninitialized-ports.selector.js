import { createSelector } from "reselect";
import { selectPortsList } from "./ports-list.selector";
import { reduce } from 'lodash';

export const selectUninitializedPorts = createSelector(
    selectPortsList,
    (ports) => reduce(ports, (acc, { path, ready }) => ready ? acc : [...acc, path], [])
)
