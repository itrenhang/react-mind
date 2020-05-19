import { useContext } from "react";
import { context } from "../../index";

const useNodeData = () => {
  const {
    history: { dispatch: hDispatch }
  } = useContext(context);
  return {
    setHistory(data) {
      hDispatch({
        type: "history/setHistory",
        payload: {
          ...data
        }
      });
    },
    undo(data) {
      hDispatch({
        type: "history/undo",
        payload: {
          ...data
        }
      });
    },
    redo(data) {
      hDispatch({
        type: "history/redo",
        payload: {
          ...data
        }
      });
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
