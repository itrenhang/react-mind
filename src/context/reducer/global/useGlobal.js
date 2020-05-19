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
    }
  };
};

export default useGlobal;
