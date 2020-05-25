import React, {useImperativeHandle, forwardRef, useRef} from 'react';
import Provider from './context'
import ThemeProvider from './ThemeProvider';
import Main from './components/main';
import './app.css';

const App = (props, ref) => {
  const mindRef = useRef(null);
  useImperativeHandle(ref,()=>({
    setTheme(val){  // 设置主题
      mindRef.current.setTheme(val);
    },
    setMapCenter(){  // 设置居中
      mindRef.current.setMapCenter();
    },
    addChild() {  //插入子节点
      mindRef.current.addChild();
    },
    addSub() {  //插入兄弟节点
      mindRef.current.addSub();
    },
    addParent() {  //插入父节点
      mindRef.current.addParent();
    },
    deleteNode() {  //删除节点
      mindRef.current.deleteNode();
    },
    insertIcon(val) { //插入icon
      mindRef.current.insertIcon(val);
    },
    insertLink() { // 插入链接
      mindRef.current.insertLink();
    },
    insertRemarks() { // 插入备注
      mindRef.current.insertRemarks();
    },
    undo() {  // 撤销
      mindRef.current.undo();
    },
    redo() {  //恢复
      mindRef.current.redo();
    },
    moveUp(){  //上移
      mindRef.current.moveUp();
    },
    moveDown(){ //下移
      mindRef.current.moveDown();
    },
    allExpand(isExpand){  // 全部展开或收起
      mindRef.current.allExpand(isExpand);
    },
    onebyone(status){  // 逐级或逐个展开
      mindRef.current.onebyone(status);
    },
  }))
  return (
    <Provider>
      <ThemeProvider>
        <Main data={props} ref={mindRef} />
      </ThemeProvider>
    </Provider>
  );
};

export default forwardRef(App);
