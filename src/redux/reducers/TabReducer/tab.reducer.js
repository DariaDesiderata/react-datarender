export default function(
  state = {
    selectedTab: null
  },
  action
) {
  switch (action.type) {
    case 'USER_SELECTED_TAB':
      let newState = state;
      newState.selectedTab = action.payload;
      return newState;
    default:
      return state;
  }
}
