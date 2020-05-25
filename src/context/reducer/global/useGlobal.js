import { useContext } from "react";
import { context } from "../../index";

const useGlobal = () => {
  const {
    global: { dispatch: gDispatch }
  } = useContext(context);
  return {
    setTheme(theme) {
      gDispatch({
        type: "global/setTheme",
        payload: {
          theme
        }
      });
    },
    setContainerSize(data) {
      gDispatch({
        type: "global/setContainerSize",
        payload: {
          containerOption: data
        }
      });
    },
    setMapPos(data) {
      gDispatch({
        type: "global/setMapPos",
        payload: {
          mapPos: data
        }
      });
    },
    setMapPosCenter(option) {
      gDispatch({
        type: "global/setMapPosCenter",
        payload: {
          nodeRootOption: option,
        }
      });
    },
    setContextMenu(option){
      gDispatch({
        type: "global/contextMenu",
        payload: {
          contextMenuOpt: option || {x: 0,y: 0,visible: false},
        }
      });
    },
    setModalLinkAndRemarks(option){
      gDispatch({
        type:'global/setModalLinkAndRemarks',
        payload: option,
      })
    },
    setDrag(status){
      gDispatch({
        type: "global/setDrag",
        payload: {
          isDrag: status || false,
        }
      });
    },
  };
};

export default useGlobal;
