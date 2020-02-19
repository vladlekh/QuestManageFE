import { createSelector } from 'reselect';
import { selectNotificationsList } from './notifications-list.selector';
import * as _ from 'lodash';

export const selectNotificationItem = (key) =>
    createSelector(
      selectNotificationsList,
      (list) => {
          return _.some(list, ['key', key])
      },
    );
