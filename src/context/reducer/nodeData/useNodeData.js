import { useContext } from "react";
import { context } from "../../index";

const useNodeData = () => {
  const {
    nodeData: {
      dispatch: nDispatch,
      state: { nodes }
    }
  } = useContext(context);
  return {
    modifyNode(data) {
      nDispatch({
        type: "nodeData/modifyNode",
        payload: {
          ...data
        }
      });
    },
    setMapData(node) {
      nDispatch({
        type: "nodeData/setMapData",
        payload: {
          ...node
        }
      });
    },
    addChild(id) {
      if (id) {
        nDispatch({
          type: "nodeData/addChild",
          payload: {
            id
          }
        });
      }
    },
    addSub(id) {
      if (id) {
        nDispatch({
          type: "nodeData/addSub",
          payload: {
            id
          }
        });
      }
    },
    addParent(id) {
      if (id) {
        nDispatch({
          type: "nodeData/addParent",
          payload: {
            id
          }
        });
      }
    },
  };
};

export default useNodeData;
