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
    webMind.current.insertIcon();
  }
  return (
    <Example
        setTheme={setTheme}
        setMapCenter={setMapCenter}
        addChild={addChild}
        addSub={addSub}
        addParent={addParent}
        deleteNode={deleteNode}
      >
      <WebMind data={testData} ref={webMind} />
    </Example>
  )
};

ReactDOM.render(<AppTest />, document.getElementById('app'));