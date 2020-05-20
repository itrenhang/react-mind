import React from "react";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import useNodeState from "@context/reducer/nodeState/useNodeState";
import cssModule from "./index.css";

const Menu = ({ id }) => {
  const useNodeDataHook = useNodeData();
  const useNodeStateHook = useNodeState();
  const menuList = [
    {
      name: "编辑",
      shortcut: "F2",
      handle() {
        useNodeStateHook.editNode(id);
      }
    },
    {
      name: "删除",
      shortcut: "Delete",
      handle() {
        useNodeDataHook.deleteNode(id);
      }
    },
    {
      name: "前移",
      shortcut: "Alt+Up",
      handle() {
        useNodeDataHook.moveUp(id);
      }
    },
    {
      name: "后移",
      shortcut: "Alt+Down",
      handle() {
        useNodeDataHook.moveDown(id);
      }
    },
    {
      name: "上级",
      shortcut: "Shift+Tap",
      handle() {
        useNodeDataHook.addParent(id);
      }
    },
    {
      name: "下级",
      shortcut: "Tap",
      handle() {
        useNodeDataHook.addChild(id);
      }
    },
    {
      name: "同级",
      shortcut: "Enter",
      handle() {
        useNodeDataHook.addSub(id);
      }
    }
  ];
  return (
    <div className={cssModule.menu}>
      <ul>
        {menuList.map((item, index) => {
          return (
            <li className={cssModule.list} key={index} onClick={item.handle}>
              {item.name}
              <span className={cssModule.shortcut}>{item.shortcut}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
