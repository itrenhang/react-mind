

const zoomEvent = (useGlobalHook) => {
  return event => {
    var delta = event.wheelDelta || event.detail;
    if(event.ctrlKey && delta){
      event.preventDefault()
      event.stopPropagation()
      useGlobalHook.setZoom(delta);
    }
  }
};

export default zoomEvent;