import React, { useRef, useContext, useEffect } from "react";
import { context } from "../../context";
import { drawLineCanvas } from "../../methods/drawCanvas";
import { themeConfig } from "../../ThemeProvider/theme.config";
import cssModule from "./index.css";

const LineCanvas = ({parent_ref, node_refs}) => {
  const {
    nodeData: {
      state: { nodes }
    },
    global: {
      state: { theme, zoom, mindType }
    }
  } = useContext(context);
  const self = useRef(null);
  useEffect(() => {
    const dom = self.current;
    dom.width = parent_ref.current.offsetWidth;
    dom.height = parent_ref.current.offsetHeight;
    const ctx = dom.getContext("2d");
    const color = themeConfig[theme]["--theme-color"];
    drawLineCanvas(ctx, color, nodes, mindType, node_refs);
  }, [theme, nodes, zoom]);
  return <canvas ref={self} className={cssModule.wrapper}></canvas>;
};

export default LineCanvas;
