import React, { useContext } from "react";
import ReactDOM from "react-dom";
import useGlobal from "@context/reducer/global/useGlobal";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import useNodeState from "@context/reducer/nodeState/useNodeState";
import { context } from "@context";
import cssModule from "./index.css";

const ContextMenu = () => {
  const useNodeDataHook = useNodeData();
  const useNodeStateHook = useNodeState();
  const useGlobalHook = useGlobal();
  const {
    nodeState: { state: { currentNode } },
    global: { state: { contextMenuOpt } },
  } = useContext(context);
  const hideContextMenu = (e) => {
    e.stopPropagation();
    useGlobalHook.setContextMenu();
  };
  const menuList = [
    {
      name: "编辑",
      shortcut: "F2",
      handle(e) {
        hideContextMenu(e);
        useNodeStateHook.editNode(currentNode);
      }
    },
    {
      name: "删除",
      shortcut: "Delete",
      handle(e) {
        hideContextMenu(e);
        useNodeDataHook.deleteNode(currentNode);
      }
    },
    {
      name: "前移",
      shortcut: "Alt+Up",
      handle(e) {
        hideContextMenu(e);
        useNodeDataHook.moveUp(currentNode);
      }
    },
    {
      name: "后移",
      shortcut: "Alt+Down",
      handle(e) {
        hideContextMenu(e);
        useNodeDataHook.moveDown(currentNode);
      }
    },
    {
      name: "上级",
      shortcut: "Shift+Tap",
      handle(d) {
        hideContextMenu(e);
        useNodeDataHook.addParent(currentNode);
      }
    },
    {
      name: "下级",
      shortcut: "Tap",
      handle(d) {
        hideContextMenu(e);
        useNodeDataHook.addChild(currentNode);
      }
    },
    {
      name: "同级",
      shortcut: "Enter",
      handle(e) {
        hideContextMenu(e);
        useNodeDataHook.addSub(currentNode);
      }
    }
  ];
  const style = {top:contextMenuOpt.y+'px',left:contextMenuOpt.x+'px',display: contextMenuOpt.visible?'block':'none'}
  const createMenu = () => {
    return (
      <div className={cssModule.menu} style={style}>
        <ul>
          {menuList.map((item, index) => {
            return (
              <li className={cssModule.list} key={index} onClick={e=>item.handle(e)}>
                {item.name}
                <span className={cssModule.shortcut}>{item.shortcut}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return ReactDOM.createPortal(createMenu(), document.body);
};

export default ContextMenu;
