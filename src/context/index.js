import React, { useReducer } from "react";;
import * as reducers from './reducer';

const context = React.createContext({});

const WrapperProvider = props => {
  const combined = {};
  for(let item in reducers){
    const [state, dispatch] = useReducer(reducers[item].reducers, reducers[item].state);
    combined[item] = {
      state,
      dispatch
    }
  }
  return <context.Provider value={combined}>{props.children}</context.Provider>;
};

export { context };
export default WrapperProvider;
