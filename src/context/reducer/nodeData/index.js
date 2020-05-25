import { findNode, deepCopy, cteateNode, createParentNode, iconSort } from "../../../methods/nodeFunction";

const defaultNodes = {
  nodes: cteateNode({ id: "root", ZIndex: "1", content: { text: '新建脑图' } })
};
export const nodeData = {
  state: {
    nodes: {}
  },
  reducers(state, action) {
    let nodes, node_found, new_state, parent_node, index, payload;
    payload = action.payload;
    new_state = deepCopy(state);
    if (payload.id) {
      node_found = findNode(new_state.nodes, payload.id);
    }
    switch (action.type) {
      case "nodeData/modifyNode":
        if (
          node_found instanceof Object &&
          Object.keys(node_found).length > 0
        ) {
          Object.assign(node_found, action.payload.node);
          return new_state;
        } else {
          return state;
        }

      case 'nodeData/modifyContent':
        if (
          node_found instanceof Object &&
          Object.keys(node_found).length > 0
        ) {
          const node = { ...node_found };
          if (action.payload.icon) {
            const icon = deepCopy(node_found.content.icon);
            const newIcon = iconSort(icon, action.payload.icon);
            node.content.icon = [...newIcon]
          }
          node.content = { ...node.content, ...action.payload }
          Object.assign(node_found, node);
          return new_state;
        }
        return state;

      case "nodeData/setMapData":
        nodes = payload.data;
        if (nodes instanceof Object && Object.keys(nodes).length > 0) {
          return { ...new_state, nodes };
        } else {
          return { ...new_state, ...defaultNodes };
        }
      case "nodeData/addChild":
        payload.node.ZIndex = +node_found.ZIndex + 1;
        payload.node.parentId = payload.id;
        node_found.children.push(payload.node);
        return new_state;
      case "nodeData/addSub":
        parent_node = findNode(new_state.nodes, node_found.parentId);
        payload.node.ZIndex = +node_found.ZIndex;
        payload.node.parentId = node_found.parentId;
        parent_node.children.push(payload.node);
        return new_state;
      case "nodeData/addParent":
        parent_node = findNode(new_state.nodes, node_found.parentId);
        if (parent_node) {
          index = parent_node.children.findIndex(
            node => node.id === payload.id
          );
          parent_node.children.splice(
            index,
            1,
            createParentNode(parent_node, node_found, payload.node)
          );
        }
        return new_state;
      case "nodeData/deleteNode":
        parent_node = findNode(new_state.nodes, node_found.parentId);
        if (parent_node) {
          index = parent_node.children.findIndex(
            node => node.id === payload.id
          );
          parent_node.children.splice(index, 1);
        }
        return new_state;
      case "nodeData/moveLayer":
        parent_node = findNode(new_state.nodes, node_found.parentId);
        if (parent_node) {
          index = parent_node.children.findIndex(
            node => node.id === payload.id
          );
          if ((index - payload.direction > -1 && index - payload.direction < parent_node.children.length)) {
            parent_node.children[index] = parent_node.children.splice(index - payload.direction, 1, parent_node.children[index])[0];
            return new_state;
          }
        }
        return state;
      case 'nodeData/expand':
        node_found.expanded = action.payload.expanded;
        return new_state;
      default:
        return state;
    }
  }
};
