export class ActionHelper {
	static EMIT_ACTION = 'EMIT_ACTION';

	static eventEnum = {
		setPersons: 'set.persons',
		turnLight: 'turn.light',
		switchLight: 'switch.light',
		reset: 'reset',
	};

	static createEmitActionType(name) {
		return `[${name.toUpperCase()}] EMIT ACTION`;
	}

	static emit(event, data = null) {
		return {
			type: ActionHelper.EMIT_ACTION,
			payload: { event, data }
		}
	}
}
