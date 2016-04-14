import {
  Actions,
} from 'react-native-router-flux';

export function router(state = {}, action) {
  let array = [];
  switch (action.type) {
    case Actions.BEFORE_ROUTE:
      return {
        ...state,
        beforeRoute: action.name,
      };
    case Actions.AFTER_ROUTE:
      if (state.routeHistory) {
        array = [...state.routeHistory];
      }
      array.push(action.name);
      return {
        ...state,
        routeHistory: array,
      };
    case Actions.AFTER_POP:
      if (state.routeHistory) {
        array = [...state.routeHistory];
      }
      array.push(action.name);
      return {
        ...state,
        beforeRoute: action.name,
        routeHistory: array,
      };
    case Actions.BEFORE_POP:
      // console.log("BEFORE_POP:", action);
      return state;
    case Actions.AFTER_DISMISS:
      //console.log("AFTER_DISMISS:", action);
      return state;
    case Actions.BEFORE_DISMISS:
      //console.log("BEFORE_DISMISS:", action);
      return state;
    default:
      return state;
  }
}
