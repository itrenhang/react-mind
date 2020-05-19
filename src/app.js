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
  const undo = () => {
    webMind.current.undo();
  }
  const redo = () => {
    webMind.current.redo();
  }
  const moveUp = () => {
    webMind.current.moveUp();
  }
  const moveDown = () => {
    webMind.current.moveDown();
  }
  return (
    <Example
        setTheme={setTheme}
        setMapCenter={setMapCenter}
        addChild={addChild}
        addSub={addSub}
        addParent={addParent}
        deleteNode={deleteNode}
        undo={undo}
        redo={redo}
        moveUp={moveUp}
        moveDown={moveDown}
      >
      <WebMind data={testData} ref={webMind} />
    </Example>
  )
};

ReactDOM.render(<AppTest />, document.getElementById('app'));