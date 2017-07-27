import { USER_SELECTED_TAB } from '../index';

export const userSelectedTab = payload => {
  let type = USER_SELECTED_TAB;
  let action = { type, payload };
  return action;
};
