export const global = {
  state: {
    theme: "primary",
    mindType: "mindMap",
    zoom: 1,
    contextMenuOpt: {},
    modalLinkAndRemarks: "",
    containerOption: {
      w: 0,
      h: 0
    },
    mapPos: {
      x: 0,
      y: 0
    },
    isDrag: false,
    onebyone: false
  },
  reducers(state, action) {
    switch (action.type) {
      case "global/setTheme":
      case "global/setMindType":
      case "global/setContainerSize":
      case "global/setMapPos":
        return { ...state, ...action.payload };
      case "global/setZoom":
        if(action.payload.zoom > 0){
          state.zoom += 0.1;
        }else if(action.payload.zoom < 0){
          state.zoom -= 0.1;
        }else{
          state.zoom = 1;
        }
        if(state.zoom < 0.5){
          state.zoom = 0.5;
        }else if(state.zoom > 2){
          state.zoom = 2;
        }
        return { ...state }
      case "global/setMapPosCenter":
        const { nodeRootOption } = action.payload;
        const { containerOption } = state;
        const mapPos = {};
        mapPos.x =
          containerOption.w / 2 - nodeRootOption.x - nodeRootOption.w / 2;
        mapPos.y =
          containerOption.h / 2 - nodeRootOption.y - nodeRootOption.h / 2;
        return { ...state, ...{ mapPos } };
      case "global/contextMenu":
        const { contextMenuOpt } = action.payload;
        return { ...state, ...{ contextMenuOpt } };
      case "global/setModalLinkAndRemarks":
        return { ...state, modalLinkAndRemarks: action.payload };
      case "global/setDrag":
        const { isDrag } = action.payload;
        return { ...state, ...{ isDrag } };
      case "global/onebyone":
        const { onebyone } = action.payload;
        return { ...state, ...{ onebyone } };
      default:
        return state;
    }
  }
};
