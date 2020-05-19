import { useContext } from "react";
import { context } from "../../index";

const useNodeData = () => {
  const {
    history: { dispatch: hDispatch, state:history },
    nodeData: { dispatch: nDispatch },
    nodeState: { dispatch: nsDispatch },
  } = useContext(context);
  const applySnapshot = snapshot => {
    if (snapshot) {
        const {nodes, currentNode} = snapshot;
        nDispatch({
          type: "nodeData/setMapData",
          payload: {
            ...{data: JSON.parse(nodes)}
          }
        })
        nsDispatch({
          type: "nodeState/selectNode",
          payload: {
            current: currentNode
          }
        })
    }
};
  return {
    setHistory(data) {
      hDispatch({
        type: "history/setHistory",
        payload: {
          ...data
        }
      });
    },
    undo() {
      applySnapshot(history.undo[history.undo.length - 1]);
    },
    redo(data) {
      applySnapshot(history.redo[0]);
    },
    clearHistory(data) {
      hDispatch({
        type: "history/clearHistory",
        payload: {
          ...data
        }
      });
    },
  };
};

export default useNodeData;
