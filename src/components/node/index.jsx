import React, { useEffect, useRef, useContext } from "react";
import cssModule from "./index.css";
import NodeContent from "./nodeContent.jsx";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import useNodeState from "@context/reducer/nodeState/useNodeState";
import { context } from "@context";
import useGlobal from "@context/reducer/global/useGlobal";

const Node = ({ data, node_refs }) => {
  const self = useRef(null);
  const useNodeDataHook = useNodeData();
  const useNodeStateHook = useNodeState();
  const useGlobalHook = useGlobal();
  const {
    nodeState: {
      state: { currentNode, editNode }
    }
  } = useContext(context);

  let cls = "";
  if (data.ZIndex == 1) {
    cls = cssModule.node_root;
  } else if (data.ZIndex == 2) {
    cls = cssModule.node_second_children;
  } else {
    cls = cssModule.node_children;
  }
  useEffect(() => {
    if (self.current) {
      const ele = self.current;
      node_refs.set(data.id, ele);
      if (data.ZIndex == 1) {
        useGlobalHook.setMapPosCenter({
          w: ele.offsetWidth,
          h: ele.offsetHeight,
          x: ele.offsetLeft,
          y: ele.offsetTop
        });
      }
    }
    return () => {
      node_refs.delete(data.id);
    }
  }, []);
  
  const className = `${cssModule.node_item} 
  ${currentNode === data.id && cssModule.active_node_item} `;

  const nodeClick = (id, e) => {
    e.stopPropagation();
    useNodeStateHook.selectNode(id);
    useGlobalHook.setContextMenu();
  };

  const editClick = (id, e) => {
    e.stopPropagation();
    useNodeStateHook.editNode(id);
    useGlobalHook.setContextMenu();
  };

  // 发送编辑成功
  const finishEditing = text => {
    const node = {
      ...data,
      content: {
        ...data.content,
        text,
      }
    }
    useNodeDataHook.modifyNode({ id: data.id, node, });
    useNodeStateHook.selectNode(data.id);
  }

  const handleContextMenu = (event) => {
    event.persist()
    event.preventDefault();
    useNodeStateHook.selectNode(data.id);
    useGlobalHook.setContextMenu({
      x: event.pageX,
      y: event.pageY,
      visible: true
    })
  }
  const setExpend = (e) => {
    e.stopPropagation();
    useNodeDataHook.expand(data.id, !data.expanded);
  }
  return (
    <div
      onClick={e => nodeClick(data.id, e)}
      onDoubleClick={e => editClick(data.id, e)}
      onContextMenu={handleContextMenu}
      className={className} ref={self}>
      <NodeContent
        className={cls}
        finishEditing={finishEditing}
        canEdit={editNode === data.id}
        data={data}
        setExpend={setExpend}
        />
    </div>
  )

}

export default React.memo(Node);
