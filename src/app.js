import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {WebMind} from './index.js';
import Example from '../example';
import {testData} from '../example/testData.js';
const AppTest = () => {
  const webMind = useRef(null);
  const setTheme = () => {
    webMind.current.setTheme('pink');
  };
  const setMapCenter = () =>{
    webMind.current.setMapCenter();
  }
  const addChild = () => {
    webMind.current.addChild();
  }
  const addSub = () => {
    webMind.current.addSub();
  }
  const addParent = () => {
    webMind.current.addParent();
  }
  const deleteNode = () => {
    webMind.current.deleteNode();
  }
  const insertIcon = () => {
    webMind.current.insertIcon({url:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg',sort:1});
  }
  const insertIcon2 = () => {
    webMind.current.insertIcon({url:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3892521478,1695688217&fm=26&gp=0.jpg',sort:0});
  }
  const undo = () => {
    webMind.current.undo();
  }
  const redo = () => {
    webMind.current.redo();
  }
  return (
    <Example
        setTheme={setTheme}
        setMapCenter={setMapCenter}
        addChild={addChild}
        addSub={addSub}
        addParent={addParent}
        deleteNode={deleteNode}
        insertIcon={insertIcon}
        insertIcon2={insertIcon2}
        undo={undo}
        redo={redo}
      >
      <WebMind data={testData} ref={webMind} />
    </Example>
  )
};

ReactDOM.render(<AppTest />, document.getElementById('app'));