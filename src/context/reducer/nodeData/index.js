import { findNode, deepCopy } from "../../../methods/nodeFunction";
import md5 from "md5";
const cteateNode = ({ id, parentId, ZIndex, content }) => {
  id = id || md5("" + Date.now() + Math.random());
  content = content || "新建节点";
  parentId = parentId || null;
  return {
    id,
    ZIndex,
    content,
    parentId,
    style: {},
    children: []
  };
};
const defaultNodes = {
  nodes: cteateNode({ id: "root", ZIndex: "1", content: {text:'新建脑图'} })
};
export const nodeData = {
  state: {
    nodes: {}
  },
  reducers(state, action) {
    let nodes, node_found, new_state, parent_node, new_parentNode;
    switch (action.type) {
      case "nodeData/modifyNode":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        if (node_found instanceof Object && Object.keys(node_found).length > 0) {
          Object.assign(node_found, action.payload.node);
          return new_state;
        } else {
          return state;
        }
      case "nodeData/setMapData":
        new_state = deepCopy(state);
        nodes = action.payload.data;
        if (nodes instanceof Object && Object.keys(nodes).length > 0) {
          return { ...new_state, nodes };
        } else {
          return { ...new_state, ...defaultNodes };
        }
      case "nodeData/addChild":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        node_found.children.push(
          cteateNode({
            ZIndex: +node_found.ZIndex + 1,
            parentId: action.payload.id
          })
        );
        return new_state;
      case "nodeData/addSub":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        parent_node = findNode(new_state.nodes, node_found.parentId);
        parent_node.children.push(
          cteateNode({
            ZIndex: +node_found.ZIndex,
            parentId: node_found.parentId
          })
        );
        return new_state;
      case "nodeData/addParent":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        parent_node = findNode(new_state.nodes, node_found.parentId);
        let index = 0;
        parent_node.children.forEach((item, i) => {
          if (item.id == action.payload.id) {
            index = i;
          }
        });
        new_parentNode = cteateNode({ ZIndex: +node_found.ZIndex });
        new_parentNode.children.push(node_found)
        parent_node.children.splice(
          index,
          1,
          new_parentNode
        );
      return new_state;
      default:
        return state;
    }
  }
};
