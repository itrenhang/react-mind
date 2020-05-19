import React from "react";
import cssModule from "./index.css";

const Example = props => {
  return (
    <>
      <div className={cssModule.tool}>
        <button onClick={props.setMapCenter}>居中</button>
        <button onClick={props.setTheme}>修改主题</button>
        <button onClick={props.addChild}>插入子级</button>
        <button onClick={props.addSub}>插入同级</button>
        <button onClick={props.addParent}>插入上级</button>
        <button onClick={props.deleteNode}>删除</button>
      </div>
      <div className={cssModule.map}>{props.children}</div>
    </>
  );
};

export default Example;