import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useMemo,
  useContext,
  useRef
} from "react";
import NodeList from "../nodeList";
import useGlobal from "@context/reducer/global/useGlobal";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import useNodeState from "@context/reducer/nodeState/useNodeState";
import cssModule from "./index.css";
import { context } from "@context";
import LineCanvas from '../lineCanvas';
const node_refs = new Map();
const Main = (props, ref) => {
  const useGlobalHook = useGlobal();
  const useNodeDataHook = useNodeData();
  const useNodeStateHook = useNodeState();

  const {
    global: {
      state: { mapPos }
    }
  } = useContext(context);
  const {
    nodeData: { state: { nodes } },
    nodeState: { state: { currentNode } },
  } = useContext(context);
  const containerEle = useRef(null);
  const self = useRef(null);
  const { data } = props;

  const mainMatrix = useMemo(() => {
    return { transform: `Matrix(1, 0, 0, 1, ${mapPos.x}, ${mapPos.y})` };
  }, [mapPos.x, mapPos.y]);

  useImperativeHandle(ref, () => ({
    setTheme(val) {
      useGlobalHook.setTheme(val);
    },
    setMapCenter() {
      useGlobalHook.setMapPosCenter();
    },
    addChild() {
      useNodeDataHook.addChild(currentNode);
    },
    addSub() {
      useNodeDataHook.addSub(currentNode);
    },
    addParent() {
      useNodeDataHook.addParent(currentNode);
    },
    deleteNode() {
      useNodeDataHook.deleteNode(currentNode);
    }
  }));
  useEffect(() => {
    if ((data.data instanceof Object && Object.keys(data.data).length > 0) || !data.data) {
      useNodeDataHook.setMapData(data);
      useGlobalHook.setContainerSize({
        w: containerEle.current.offsetWidth,
        h: containerEle.current.offsetHeight
      });
    }
  }, []);
  useEffect(()=>{
    
  },[])
  const overallClick = () => {
    if (currentNode) {
      useNodeStateHook.selectNode('');
    }
  }
  const createNode = () => {
    if(Object.keys(nodes).length > 0){
      return (
        <>
          <NodeList node_refs={node_refs} />
          <LineCanvas parent_ref={self} node_refs={node_refs} />
        </>
      )
    }else{
      return null;
    }
  };

  return (
    <div className={cssModule.container_root} onClick={overallClick} ref={containerEle}>
      <main className={cssModule.main_root} style={mainMatrix} ref={self}>
        {createNode()}
      </main>
    </div>
  );
};

export default forwardRef(Main);
