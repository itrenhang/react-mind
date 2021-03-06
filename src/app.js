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
  const insertLink = () => {
    webMind.current.insertLink();
  }
  const insertRemarks = () => {
    webMind.current.insertRemarks();
  }
  const insertImg = () => {
    webMind.current.insertImg('https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg');
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
  const allExpand = (isExpand) => {
    webMind.current.allExpand(isExpand);
  }
  const onebyone = (status) => {
    webMind.current.onebyone(status);
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
        insertLink={insertLink}
        insertRemarks={insertRemarks}
        insertImg={insertImg}
        undo={undo}
        redo={redo}
        moveUp={moveUp}
        moveDown={moveDown}
        allExpand={allExpand}
        onebyone={onebyone}
      >
      <WebMind data={testData} ref={webMind} />
    </Example>
  )
};

ReactDOM.render(<AppTest />, document.getElementById('app'));