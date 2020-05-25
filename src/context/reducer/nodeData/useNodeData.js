import { useContext } from "react";
import { context } from "../../index";
import { cteateNode } from "../../../methods/nodeFunction";

const useNodeData = () => {
  const {
    nodeData: { dispatch: nDispatch },
    nodeState: { dispatch: nsDispatch }
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
    modifyContent(data) {
      nDispatch({
        type: 'nodeData/modifyContent',
        payload: { ...data }
      })
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
        const node = cteateNode();
        nDispatch({
          type: "nodeData/addChild",
          payload: {
            id,
            node
          }
        });
        nsDispatch({
          type: "nodeState/selectNode",
          payload: {
            current: node.id,
            edit: node.id
          }
        });
      }
    },
    addSub(id) {
      if (id) {
        const node = cteateNode();
        nDispatch({
          type: "nodeData/addSub",
          payload: {
            id,
            node
          }
        });
        nsDispatch({
          type: "nodeState/selectNode",
          payload: {
            current: node.id,
            edit: node.id
          }
        });
      }
    },
    addParent(id) {
      if (id) {
        const node = cteateNode();
        nDispatch({
          type: "nodeData/addParent",
          payload: {
            id,
            node
          }
        });
        nsDispatch({
          type: "nodeState/selectNode",
          payload: {
            current: node.id,
            edit: node.id
          }
        });
      }
    },
    deleteNode(id) {
      if (id) {
        nDispatch({
          type: "nodeData/deleteNode",
          payload: {
            id,
          }
        });
      }
    },
    moveUp(id) {
      if (id) {
        nDispatch({
          type: "nodeData/moveLayer",
          payload: {
            id,
            direction: 1
          }
        });
      }
    },
    moveDown(id) {
      if (id) {
        nDispatch({
          type: "nodeData/moveLayer",
          payload: {
            id,
            direction: -1
          }
        });
      }
    },
    subMoveNode(id, toId, direction){
      if(id && toId && direction){
        nDispatch({
          type: "nodeData/subMoveNode",
          payload: {
            id,
            toId,
            direction
          }
        });
      }
    },
    moveNode(id, toId) {
      if (id && toId) {
        nDispatch({
          type: "nodeData/moveNode",
          payload: {
            id,
            toId
          }
        });
      }
    },
    expand(id, expanded) {
      if (id) {
        nDispatch({
          type: "nodeData/expand",
          payload: {
            id,
            expanded
          }
        });
      }
    },
    allExpand(isExpand){
      nDispatch({
        type: "nodeData/allExpand",
        payload:{
          isExpand
        }
      });
    },
  };
};

export default useNodeData;
