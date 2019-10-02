import { reduce } from 'lodash';
import constantCase from "constant-case";
import { ActionHelper } from "./action.helper";
import { SET_PORT_INITIALIZING_ACTION, SET_PORT_READY_ACTION } from '../store/ports/actions';

export class ReducerHelper {
	static createRoomReducer(config) {
		return reduce(config, (acc, {displayName, socketNamespace, ...val}, key) => {
			const { controls, actionTypeMap } = this.createInitialRoomsState(key, val);
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

	static createInitialRoomsState(key, val) {
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

	static createPortsReducer(ports) {
		const initialState = ReducerHelper.createInitialPortsState(ports);
		return (state = initialState, action) => {
			switch (action.type) {
				case SET_PORT_READY_ACTION: {
					const { path, value } = action.payload;
					return {
						...state,
						list: state.list.map(port => port.path === path ? { ...port, ready: value } : { ...port })
					}
				}
				case SET_PORT_INITIALIZING_ACTION: {
					const { initializing } = action.payload;
					return {
						...state,
						initializing,
					}
				}
				default: {
					return {
						...state,
					}
				}
			}
		};
	}

	static createInitialPortsState(ports) {
		return {
			list: ports.map(port => ({
				...port,
				ready: false,
				connected: false,
			})),
			initializing: false,
		}
	}
}
