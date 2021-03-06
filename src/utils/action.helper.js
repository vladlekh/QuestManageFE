export class ActionHelper {
	static EMIT_ACTION = 'EMIT_ACTION';

	static lightEnum = {
		ON: 'ON',
		OFF: 'OFF'
	};

	static eventEnum = {
		setPersons: 'set.persons',
		turnLight: 'turn.light',
		startLight: 'start.light',
		switchLight: 'switch.light',
		startQuest: 'start.quest',
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
