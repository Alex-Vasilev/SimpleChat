import { NavigationActions, StackActions } from 'react-navigation';

import processRoute from './routing';

const actions = {
  navigate: 'navigate',
  replace: 'replace',
};

export function navigate(routeName, params, route) {
  return function(dispatch) {
    return dispatch(processRoute({ routeName, params, route })).then(updatedRouteInfo => {
      return dispatch(
        NavigationActions.navigate(createRoute(updatedRouteInfo, actions.navigate)),
      );
    });
  };
}

export function back() {
  return function(dispatch) {
    return dispatch(NavigationActions.back());
  };
}

export function reset(routeName, params, route) {
  return function(dispatch) {
    return dispatch(processRoute({ routeName, params, route })).then(updatedRouteInfo => {
      return dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate(createRoute(updatedRouteInfo, actions.replace)),
          ],
        }),
      );
    });
  };
}

export function replace(routeName, params, route) {
  return function(dispatch) {
    return dispatch(processRoute({ routeName, params, route })).then(updatedRouteInfo => {
      return dispatch(
        StackActions.replace(createRoute(updatedRouteInfo, actions.replace)),
      );
    });
  };
}


function createRoute(routeInfo, action) {
  let routes = null;

  routeInfo.forEach(item => {
    const { routeName, params } = item;

    if (routes) {
      switch (action) {
        case actions.navigate:
          routes.action = NavigationActions.navigate({ routeName, params });
          break;

        case actions.replace:
          routes.action = StackActions.replace({ routeName, params });
          break;
      }
    } else {
      routes = {
        routeName,
        params,
      };
    }
  });

  return routes;
}
