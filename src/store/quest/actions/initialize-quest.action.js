export const INITIALIZE_QUEST_ACTION = 'INITIALIZE_QUEST_ACTION';

export const initializeQuestAction = (initialized) => ({
	type: INITIALIZE_QUEST_ACTION,
	payload: { initialized }
});
