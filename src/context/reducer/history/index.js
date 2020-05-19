import { deepCopy } from "../../../methods/nodeFunction";

export const history = {
  state: {
    undo: [],
    redo: [],
    last_snapshot: null
  },
  reducers(state, action) {
    let new_state;
    switch (action.type) {
      case "history/setHistory":
          new_state = deepCopy(state);
        if (new_state.last_snapshot) {
          if (
            new_state.undo.length > 0 &&
            new_state.undo[new_state.undo.length - 1].nodes ===
              action.payload.nodes
          ) {
            new_state.redo.unshift(new_state.last_snapshot);
            new_state.undo.pop();
          } else if (
            new_state.redo.length > 0 &&
            new_state.redo[0].nodes === action.payload.nodes
          ) {
            new_state.undo.push(new_state.last_snapshot);
            new_state.redo.shift();
          } else {
            new_state.undo.push(new_state.last_snapshot);
            new_state.redo = [];
          }
        }
        new_state.last_snapshot = action.payload;
        return new_state;
      case "history/undo":
        new_state = deepCopy(state);
        new_state.pointer = action.payload.pointer;
        return new_state;
      case "history/redo":
        return state;
      case "history/clearHistory":
        return { history: [], pointer: 0 };
      default:
        return state;
    }
  }
};
