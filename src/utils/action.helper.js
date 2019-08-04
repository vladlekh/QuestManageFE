export class ActionHelper {
	static createEmitActionType(name) {
		return `[${name.toUpperCase()}] EMIT ACTION`;
	}
}
