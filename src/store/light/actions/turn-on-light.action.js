import { ActionHelper } from "../../../utils/action.helper";

export const TURN_ON_LIGHT_ACTION = 'TURN_ON_LIGHT_ACTION';

export const turnOnLightAction = (data = ActionHelper.lightEnum.ON) => ({
	type: TURN_ON_LIGHT_ACTION,
	payload: { event: ActionHelper.eventEnum.turnLight, data }
});
