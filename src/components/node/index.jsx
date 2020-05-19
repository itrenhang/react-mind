import React, { useEffect, useRef, useContext } from "react";
import cssModule from "./index.css";
import EditContainer from "./edit.jsx";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import useNodeState from "@context/reducer/nodeState/useNodeState";
import { context } from "@context";
import useGlobal from "@context/reducer/global/useGlobal";

const Node = ({data, node_refs}) => {
  const self = useRef(null);
  const useNodeDataHook = useNodeData();
  const useNodeStateHook = useNodeState();
  const useGlobalHook = useGlobal();

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
      if (data.id == "root") {
        useGlobalHook.setMapPosCenter({
          w: ele.offsetWidth,
          h: ele.offsetHeight,
          x: ele.offsetLeft,
          y: ele.offsetTop
        });
      }
    }
    return ()=>{
      node_refs.delete(data.id);
    }
  }, []);

  const {
    nodeState: {
      state: { currentNode, editNode }
    }
  } = useContext(context);
  const className = `${cssModule.node_item} 
  ${currentNode === data.id && cssModule.active_node_item} `;

  const nodeClick = (id, e) => {
    e.stopPropagation();
    useNodeStateHook.selectNode(id);
  };

  const editClick = (id, e) => {
    e.stopPropagation();
    useNodeStateHook.editNode(id);
  };

  // 发送编辑成功
  const finishEditing = content => {
    const node = {
      ...data,
      content
    }
    useNodeDataHook.modifyNode({ id: data.id, node, });
    useNodeStateHook.selectNode(data.id);
  }

  return (
    <div
      onClick={e => nodeClick(data.id, e)}
      onDoubleClick={e => editClick(data.id, e)}
      className={className} ref={self}>
      {editNode === data.id &&
        <EditContainer finishEditing={finishEditing}>
          {data.content}
        </EditContainer>
      }
      <p className={cls} dangerouslySetInnerHTML={{ __html: data.content }} />
    </div >
  )

}

export default React.memo(Node);
