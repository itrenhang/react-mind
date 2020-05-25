export const global = {
  state: {
    theme: "primary",
    mindType: "mindMap",
    zoom:1,
    contextMenuOpt:{},
    containerOption: {
      w: 0,
      h: 0
    },
    mapPos: {
      x: 0,
      y: 0
    },
    isDrag: false,
  },
  reducers(state, action) {
    switch (action.type) {
      case "global/setTheme":
      case "global/setMindType":
      case "global/setContainerSize":
      case "global/setMapPos":
        return { ...state, ...action.payload };
      case "global/setMapPosCenter":
        const {nodeRootOption} = action.payload;
        const { containerOption } = state;
        const mapPos = {};
        mapPos.x = containerOption.w/2 - nodeRootOption.x - nodeRootOption.w/2;
        mapPos.y = containerOption.h/2 - nodeRootOption.y - nodeRootOption.h/2;
        return { ...state, ...{mapPos} };
      case "global/contextMenu":
          const {contextMenuOpt} = action.payload;
          return { ...state, ...{contextMenuOpt} };
      case "global/setDrag":
          const {isDrag} = action.payload;
          return { ...state, ...{isDrag} };
      default:
        return state;
    }
  }
};
