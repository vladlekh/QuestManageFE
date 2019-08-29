import { select } from 'redux-saga/effects';
import { each } from "lodash";
import { SagaHelper } from "../../../utils/saga.helper";
import { sagaMiddleware } from "../../saga";
import { selectRoomsList } from "../../room/selectors";

export function* createSaga() {
	each(yield select(selectRoomsList), function (value) {
		sagaMiddleware.run(SagaHelper.createSaga(value));
	});
}
