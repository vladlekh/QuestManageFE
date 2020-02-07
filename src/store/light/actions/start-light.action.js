import { ActionHelper } from "../../../utils/action.helper";

export const START_LIGHT_ACTION = 'START_LIGHT_ACTION';

export const startLightAction = () => ({
  type: START_LIGHT_ACTION,
  payload: { event: ActionHelper.eventEnum.startLight }
});
