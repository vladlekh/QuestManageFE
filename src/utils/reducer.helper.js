import { reduce } from 'lodash';
import constantCase from "constant-case";
import { ActionHelper } from "./action.helper";

export class ReducerHelper {
	static createReducer(config) {
		return reduce(config, (acc, {displayName, socketNamespace, ...val}, key) => {
			const { controls, actionTypeMap } = this.createInitialState(key, val);
			return {
				...acc,
				[key]: (state = { controls, namespace: socketNamespace, displayName }, action) => {
					if (actionTypeMap.has(action.type)) {
						const name = actionTypeMap.get(action.type);
						return {
							...state,
							controls: {
								...state.controls,
								[name]: {
									...state.controls[name],
									state: true,
									warning: false,
								}
							}
						}
					}
					if(action.type === ActionHelper.createEmitActionType(key)) {
						const name = action.payload.name;
						return {
							...state,
							controls: {
								...state.controls,
								[name]: {
									...state.controls[name],
									warning: true,
								}
							}
						}
					}
					return {
						...state
					}
				}
			}
		}, {});
	}

	static createInitialState(key, val) {
		const controls = {};
		const actionTypeMap = new Map();
		const upperName = constantCase(key);
		val.ports.forEach(({ actions, path }) => {
			actions.forEach(action => {
				const actionReply = `[${upperName}] ${constantCase(action.socketReply)}_ACTION`;
				controls[action.name] = {
					...action,
					// action: `[${upperName}] ${constantCase(action.cmd)}_ACTION`,
					path,
					actionReply,
					warning: false,
					state: false,
				};
				actionTypeMap.set(actionReply, action.name);
			});
		});
		return { controls, actionTypeMap };
	}
}
