
const getDomPoi = (dom) => {
  const numArr = dom.style.transform.match(/(\-?\d+\.?\d*)/g);
  return {
    x: Number(numArr[4]),
    y: Number(numArr[5]),
  }
};
const mapDrag = (dom, mainDom, useGlobalHook) => {
  let mainPoi = {x:0,y:0};
  let s = {x:0,y:0};
  const mv = event => {
    dom.style.cursor = 'move';
    useGlobalHook.setMapPos({
      x: mainPoi.x + (event.clientX - s.x),
      y: mainPoi.y + (event.clientY - s.y)
    })
  };

  const mp = event => {
    dom.style.cursor = 'default';
    dom.removeEventListener('mousemove',mv);
    dom.removeEventListener('mouseup',mp);
  };

  return event => {
    if(event.button == '2'){
      dom.addEventListener('mousemove',mv);
      dom.addEventListener('mouseup',mp);
      mainPoi = getDomPoi(mainDom);
      s = {
        x: event.clientX,
        y: event.clientY,
      };
      
    }
  }
};

export default mapDrag;