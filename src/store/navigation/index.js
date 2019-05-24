import AppNavigator from '../../screens/navigator';

import * as ROUTES from '../../constants/routes';

console.log(1, AppNavigator)
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(ROUTES.LOADING),
);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default function(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state) || state;

  return nextState
    ? {
        ...nextState,
        activeRouteName: getActiveRouteName(nextState),
      }
    : state;
}
