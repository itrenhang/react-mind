import { findNode, deepCopy, cteateNode, createParentNode } from "../../../methods/nodeFunction";

const defaultNodes = {
  nodes: cteateNode({ id: "root", ZIndex: "1", content: "新建脑图" })
};
export const nodeData = {
  state: {
    nodes: {}
  },
  reducers(state, action) {
    let nodes, node_found, new_state, parent_node, index;
    switch (action.type) {
      case "nodeData/modifyNode":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        if (
          node_found instanceof Object &&
          Object.keys(node_found).length > 0
        ) {
          let node = {}
          if (action.payload.icon) {
            const icon = deepCopy(node_found.content.icon);
            icon[action.payload.icon.sort] = action.payload.icon;
            node = {...node_found};
            node.content.icon = [...icon]
          } else {
            node = { ...action.payload.node }
          }
          Object.assign(node_found, node);
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
        action.payload.node.ZIndex = +node_found.ZIndex + 1;
        action.payload.node.parentId = action.payload.id;
        node_found.children.push(action.payload.node);
        return new_state;
      case "nodeData/addSub":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        parent_node = findNode(new_state.nodes, node_found.parentId);
        action.payload.node.ZIndex = +node_found.ZIndex;
        action.payload.node.parentId = node_found.parentId;
        parent_node.children.push(action.payload.node);
        return new_state;
      case "nodeData/addParent":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        parent_node = findNode(new_state.nodes, node_found.parentId);
        if (parent_node) {
          index = parent_node.children.findIndex(node => node.id === action.payload.id);
          parent_node.children.splice(
            index,
            1,
            createParentNode(parent_node, node_found, action.payload.node)
          );
        }
        return new_state;
      case "nodeData/deleteNode":
        new_state = deepCopy(state);
        node_found = findNode(new_state.nodes, action.payload.id);
        parent_node = findNode(new_state.nodes, node_found.parentId);
        if (parent_node) {
          index = parent_node.children.findIndex(node => node.id === action.payload.id);
          parent_node.children.splice(index, 1);
        }
        return new_state;
      default:
        return state;
    }
  }
};
