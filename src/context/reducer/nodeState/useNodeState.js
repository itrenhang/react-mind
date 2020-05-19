import { useContext } from "react";
import { context } from "../../index";

const useNodeData = () => {
  const {
    nodeState: { dispatch: nDispatch }
  } = useContext(context);
  return {
    selectNode(node) {
      const data = {
        edit: '',
        current: node,
      }
      nDispatch({
        type: "nodeState/selectNode",
        payload: { ...data }
      });
    },
    editNode(node) {
      const data = {
        edit: node,
        current: node,
      }
      nDispatch({
        type: "nodeState/selectNode",
        payload: { ...data }
      });
    }
  };
};

export default useNodeData;