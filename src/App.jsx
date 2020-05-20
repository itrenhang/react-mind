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
    insertIcon() {
      mindRef.current.insertIcon();
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
