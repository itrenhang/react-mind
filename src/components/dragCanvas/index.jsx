import React, { useEffect, useRef, useContext } from "react";
import { themeConfig } from "../../ThemeProvider/theme.config";
import { context } from "../../context";
import dragNodeEvent from "../../methods/dragNodeEvent";
import useGlobal from "@context/reducer/global/useGlobal";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import cssModule from "./index.css";

const DragCanvas = ({parent_ref, node_refs, mapPos}) => {
  const {
    nodeData: {
      state: { nodes }
    },
    global: {
      state: { theme, zoom }
    }
  } = useContext(context);
  const useGlobalHook = useGlobal();
  const useNodeDataHook = useNodeData();
  const self = useRef(null);
  useEffect(() => {
    const dom = self.current;
    dom.width = parent_ref.current.offsetWidth;
    dom.height = parent_ref.current.offsetHeight;
  }, [nodes, zoom]);

  useEffect(() => {
    const ctx = self.current.getContext("2d");
    const handleDrag = dragNodeEvent(useGlobalHook, useNodeDataHook, ctx, themeConfig[theme], mapPos, nodes, node_refs, {w:self.current.width,h:self.current.height});
    handleDrag.forEach(event => parent_ref.current.addEventListener(event.type, event.listener));
    return () => {
        handleDrag.forEach(event => parent_ref.current.removeEventListener(event.type, event.listener));
    }
    
  }, [nodes, theme, zoom]);

  return <canvas ref={self} className={cssModule.wrapper} />;
};

export default DragCanvas;
