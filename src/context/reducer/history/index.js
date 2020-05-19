import { deepCopy } from "../../../methods/nodeFunction";

export const history = {
  state: {
    
  },
  reducers(state, action) {
    switch (action.type) {
      case "history/setHistory":
        return state;
      case "history/undo":
        return state;
      case "history/redo":
        return state;
      case "history/clearHistory":
        return state;
      default:
        return state;
    }
  }
};
