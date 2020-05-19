const drawLine = (ctx, nodes, mindType, node_refs) => {
  if (mindType == "mindMap") {
    mindMapLine(ctx, nodes, node_refs);
  }
};

const mindMapLine = (ctx, nodes, node_refs) => {
  const children = nodes.children;
  if (children.length < 1) {
    return;
  }
  const parent_ele = node_refs.get(nodes.id);
  const opt = {
    w: parent_ele.offsetWidth,
    h: parent_ele.offsetHeight,
    x: parent_ele.offsetLeft,
    y: parent_ele.offsetTop
  };
  let x1, y1, cx1, cy1, cx2, cy2, x2, y2;
  children.forEach(child => {
    const child_ele = node_refs.get(child.id);
    const cOpt = {
      w: child_ele.offsetWidth,
      h: child_ele.offsetHeight,
      x: child_ele.offsetLeft,
      y: child_ele.offsetTop
    };
    if (nodes.ZIndex == "1") {
      x1 = opt.x + opt.w / 2;
      y1 = opt.y + opt.h / 2;
      x2 = cOpt.x;
      y2 = cOpt.y + cOpt.h / 2;
      cx1 = x1;
      cy1 = (y2 - y1) / 2 + y1;
      cx2 = (x2 - x1) / 2 + x1;
      cy2 = y2;
    } else if (nodes.ZIndex !== "1") {
      x1 = opt.x + opt.w;
      y1 = opt.y + opt.h / 2;
      x2 = cOpt.x;
      y2 = cOpt.y + cOpt.h / 2;
      cx1 = (x2 - x1) / 2 + x1;
      cy1 = y1;
      cx2 = (x2 - x1) / 2 + x1;
      cy2 = y2;
    }
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    if (child.children.length > 0) {
      mindMapLine(ctx, child, node_refs);
    }
  });
};

export const drawLineCanvas = (ctx, color, nodes, mindType, node_refs) => {
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  drawLine(ctx, nodes, mindType, node_refs);
  ctx.stroke();
  // ctx.closePath();
};
