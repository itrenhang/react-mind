import { findNode } from "./nodeFunction";

const getDomOffset = dom => {
  const left = dom.offsetLeft,
      right = left + dom.offsetWidth,
      top = dom.offsetTop,
      bottom = top + dom.offsetHeight;
  return { left, right, top, bottom };
};
const dragCanvas = (ctx, theme, poi, type) => {
  ctx.fillStyle = theme['--theme-bg'];
  ctx.strokeStyle = theme['--theme-color'];
  ctx.beginPath();
  if(type > 0){
    ctx.moveTo(poi.x1,poi.y2);
    ctx.lineTo(poi.x2,poi.y2);
  }else{
    ctx.moveTo(poi.x1,poi.y1);
    ctx.lineTo(poi.x2,poi.y1);
  }
  ctx.fillRect(poi.x1,poi.y1, Math.abs(poi.x2-poi.x1),Math.abs(poi.y2-poi.y1));
  
  ctx.stroke();
};
export default (useGlobalHook, useNodeDataHook, ctx, theme, mapPos, nodes, node_refs, size) => {
  let dragId, toId, children, children_offset, drag_outer, subIndex, subDirection, isNode;
  return [
    {
      type: "dragstart",
      listener: event => {
        dragId = event.target.parentNode.id;
        const found_node = findNode(nodes, dragId);
        const parent_node = findNode(nodes, found_node.parentId);
        const drag_dom = node_refs.get(dragId);
        children = parent_node.children;
        children_offset = children.map(child => getDomOffset(node_refs.get(child.id)));
        drag_outer = {
          l: event.offsetX,
          t: event.offsetY,
          b: drag_dom.offsetHeight - event.offsetY,
          r: drag_dom.offsetWidth - event.offsetX,
        }
        useGlobalHook.setDrag(true);
      }
    },
    {
      type: "drag",
      listener: event => {
        ctx.clearRect(0,0,size.w,size.h);
        const mouseX = event.pageX - mapPos.x;  // 鼠标相对容器位置x
        const mouseY = event.pageY - mapPos.y;  // 鼠标相对容器位置y
        if(isNode){
          subIndex = null;
          subDirection = null;
          return;
        }
        for(let i=0;i<children_offset.length;i++){
          const ax1 = children_offset[i].left,ay1 = children_offset[i].top,
          ax2 = children_offset[i].right,ay2 = children_offset[i].bottom,
          dx1 = mouseX - drag_outer.l,dy1 = mouseY - drag_outer.t,
          dx2 = mouseX + drag_outer.r,dy2 = mouseY + drag_outer.b;
          const c = dy1 + (drag_outer.t + drag_outer.b)/2;
          const n = 4;
          const m = n + drag_outer.t + drag_outer.b;
          if((ax1 <= dx1 && dx1 <= ax2) || (ax1 <= dx2 && dx2 <= ax2)){ // x 坐标进入范围
            const down = ((ay2 + n) <= dy1 && dy1 <= (ay2 + m)) || ((ay2 + n) <= dy2 && dy2 <= (ay2 + m));
            const up = ((ay1 - n) >= dy1 && dy1 >= (ay1 - m)) || ((ay1 - n) >= dy2 && dy2 >= (ay1 - m));
            if(down && ((i == children_offset.length - 1) || ((children_offset[i+1].top - ay2)/2 + ay2) > c ) ){ // y 坐标
              // node 节点下方
              subIndex = i;
              subDirection = -1;
              dragCanvas(ctx, theme,{x1:ax1,y1:ay2+n,x2:ax2,y2:ay2+m},-1);
              break;
            }
            if(up && (i == 0 || ((ay1 - children_offset[i-1].bottom)/2 + children_offset[i-1].bottom) <=  c )){ // y 坐标
              // node 节点上方
              subIndex = i;
              subDirection = 1;
              dragCanvas(ctx, theme, {x1:ax1,y1:ay1-m,x2:ax2,y2:ay1-n},1);
              break;
            }
          }
          subIndex = null;
          subDirection = null;
        }
      }
    },
    {
      type: "dragover",
      listener: event => {
        event.preventDefault();
      }
    },
    {
      type: "dragenter",
      listener: event => {
        if (event.target && event.target.dataset.tag === "nodeMask") {
          event.target.parentNode.classList.add("ondrag");
          isNode = true;
        }
      }
    },
    {
      type: "dragleave",
      listener: event => {
        if (event.target && event.target.dataset.tag === "nodeMask") {
          event.target.parentNode.classList.remove("ondrag");
          isNode = false;
        }
      }
    },
    {
      type: "drop",
      listener: event => {
        if (event.target && event.target.dataset.tag === "nodeMask") {
          toId = event.target.parentNode.parentNode.id;
          event.target.parentNode.classList.remove("ondrag");
          if(dragId != toId){
            useNodeDataHook.moveNode(dragId, toId)
          }
        }
        const regPos = /^\d+$/;
        if(regPos.test(subIndex) && regPos.test(subDirection)){
          if(dragId != children[subIndex].id){
            useNodeDataHook.subMoveNode(dragId, children[subIndex].id, subDirection)
          }
        }
      }
    },
    {
      type: "dragend",
      listener: () => {
        useGlobalHook.setDrag();
        ctx.clearRect(0,0,size.w,size.h);
      }
    }
  ];
};