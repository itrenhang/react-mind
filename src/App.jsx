import React, {useImperativeHandle, forwardRef, useRef} from 'react';
import Provider from './context'
import ThemeProvider from './ThemeProvider';
import Main from './components/main';
import './app.css';

const App = (props, ref) => {
  const mindRef = useRef(null);
  useImperativeHandle(ref,()=>({
    setTheme(val){
      mindRef.current.setTheme(val);
    },
    setMapCenter(){
      mindRef.current.setMapCenter();
    },
    addChild() {
      mindRef.current.addChild();
    },
    addSub() {
      mindRef.current.addSub();
    },
    addParent() {
      mindRef.current.addParent();
    },
    deleteNode() {
      mindRef.current.deleteNode();
    }
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
