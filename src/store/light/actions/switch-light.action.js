import { ActionHelper } from "../../../utils/action.helper";

export const SWITCH_LIGHT_ACTION = 'SWITCH_LIGHT_ACTION';

export const switchLightAction = () => ({
	type: SWITCH_LIGHT_ACTION,
	payload: { event: ActionHelper.eventEnum.switchLight }
});
