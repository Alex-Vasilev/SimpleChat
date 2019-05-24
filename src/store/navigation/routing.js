import * as ROUTES from '../../constants/routes';
import { navigate, back } from './actions';

export default function process({ routeName, params, route }) {
  return function(dispatch) {
    const stack = [];
    const resultStack = [];

    function iterateRoutes(routes) {
      if (routes.routeName) {
        stack.push({
          routeName: routes.routeName,
          params: routes.params,
        });
      }

      if (routes.hasOwnProperty('route') && typeof routes.route === 'object') {
        iterateRoutes(routes.route);
      }
    }

    iterateRoutes({ routeName, params, route });

    for (let i = 0; i < stack.length; i++) {
      const { routeName, params } = stack[i];

      if (routesProcessors[routeName]) {
        return Promise.resolve(
          dispatch(routesProcessors[routeName](routeName, params)),
        ).then(updatedRouteInfo => {
          resultStack.push(updatedRouteInfo);

          return resultStack || stack;
        });
      } else {
        resultStack.push(stack[i]);
      }
    }

    return Promise.resolve(resultStack);
  };
}

const routesProcessors = {
  // [ROUTES.SOME](routeName, params) {
  //   return function() {
  //     return { routeName: ROUTES.OTHER, params };
  //   };
  // },
};
