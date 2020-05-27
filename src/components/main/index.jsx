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
import useHistory from "@context/reducer/history/useHistory";
import cssModule from "./index.css";
import { context } from "@context";
import LineCanvas from "../lineCanvas";
import DragCanvas from "../dragCanvas";
import ContextMenu from "../ContextMenu";
import LinkAndRemarks from "@components/linkAndRemarks";
import mapDrag from "../../methods/mapDrag";
import hotkey from "../../hotkeys";

const node_refs = new Map();
const Main = (props, ref) => {
  const useGlobalHook = useGlobal();
  const useNodeDataHook = useNodeData();
  const useNodeStateHook = useNodeState();
  const useHistoryHook = useHistory();
  const {
    global: {
      state: { mapPos }
    },
    nodeData: {
      state: { nodes }
    },
    nodeState: {
      state: { currentNode }
    }
  } = useContext(context);

  const containerEle = useRef(null);
  const self = useRef(null);
  const { data } = props;

  const mainMatrix = useMemo(() => {
    return { transform: `Matrix(1, 0, 0, 1, ${mapPos.x}, ${mapPos.y})` };
  }, [mapPos]);
  const nodes_json = useMemo(() => JSON.stringify(nodes), [nodes]);

  const api = {
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
    },
    insertIcon(icon) {
      useNodeDataHook.modifyContent({ icon, id: currentNode });
    },
    insertLink() {
      useGlobalHook.setModalLinkAndRemarks('link');
    },
    insertImg(img) {
      useNodeDataHook.modifyContent({ img, id: currentNode });
    },
    insertRemarks() {
      useGlobalHook.setModalLinkAndRemarks('remarks');
    },
    undo() {
      useHistoryHook.undo();
    },
    redo() {
      useHistoryHook.redo();
    },
    moveUp() {
      useNodeDataHook.moveUp(currentNode);
    },
    moveDown() {
      useNodeDataHook.moveDown(currentNode);
    },
    allExpand(isExpand) {
      useNodeDataHook.allExpand(isExpand);
    },
    onebyone(status) {
      useGlobalHook.onebyone(status);
    },
  }

  useImperativeHandle(ref, () => ({
    setTheme(val) {
      useGlobalHook.setTheme(val);
    },
    setMapCenter() {
      const dom = document.getElementById("root");
      useGlobalHook.setMapPosCenter({
        w: dom.offsetWidth,
        h: dom.offsetHeight,
        x: dom.offsetLeft,
        y: dom.offsetTop
      });
    },
    ...api
  }));
  useEffect(() => {
    useNodeDataHook.setMapData(data);
    useGlobalHook.setContainerSize({
      w: containerEle.current.offsetWidth,
      h: containerEle.current.offsetHeight
    });
  }, []);
  useEffect(() => {
    if (Object.keys(nodes).length > 0) {
      useHistoryHook.setHistory({
        nodes: nodes_json,
        currentNode
      });
    }
  }, [nodes_json]);

  useEffect(() => {
    const handleHotkey = hotkey(api);
    window.addEventListener("keydown", handleHotkey);
    return () => {
      window.removeEventListener("keydown", handleHotkey);
    }
  }, [currentNode])

  useEffect(() => {
    const dom = containerEle.current;
    const handleDrag = mapDrag(dom, self.current, useGlobalHook);
    dom.addEventListener("mousedown", handleDrag);
    return () => {
      dom.removeEventListener("mousedown", handleDrag);
    };
  }, []);
  const overallClick = () => {
    if (currentNode) {
      useNodeStateHook.selectNode("");
    }
    useGlobalHook.setContextMenu();
  };
  const handleContextMenu = event => {
    event.persist();
    event.preventDefault();
  };

  const createNode = () => {
    if (Object.keys(nodes).length > 0) {
      return (
        <>
          <NodeList node_refs={node_refs} />
          <ContextMenu />
          <LinkAndRemarks />
          <LineCanvas parent_ref={self} node_refs={node_refs} />
          <DragCanvas parent_ref={self} node_refs={node_refs} mapPos={mapPos} />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={cssModule.container_root}
      onClick={overallClick}
      ref={containerEle}
      onContextMenu={handleContextMenu}
    >
      <main className={cssModule.main_root} style={mainMatrix} ref={self}>
        {createNode()}
      </main>
    </div>
  );
};

export default forwardRef(Main);
