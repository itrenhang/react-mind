import md5 from "md5";
export const deepCopy = obj => {
  let _obj = Array.isArray(obj) ? [] : {}
  for (let i in obj) {
    _obj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
  }
  return _obj;
};

export const findNode = (node, search_id) => {
  if (node.id === search_id) {
      return node;
  }
  return node.children.map(child => findNode(child, search_id)).find(item => item);
};

export const cteateNode = ({ id, parentId, ZIndex, content }={}) => {
  id = id || md5("" + Date.now() + Math.random());
  content = content || "新建节点";
  parentId = parentId || null;
  ZIndex = ZIndex || 1;
  return {
    id,
    ZIndex,
    content,
    parentId,
    style: {},
    children: []
  };
};

const nodeZIndexPlus = (node) => {
  node.ZIndex++;
  if(node.children && node.children.length > 0){
    for(let i=0;i<node.children.length;i++){
      nodeZIndexPlus(node.children[i])
    }
  }
  return node;
};

export const createParentNode = (parent_node, node, new_parentNode) => {
  
  new_parentNode.ZIndex = +node.ZIndex;
  new_parentNode.parentId = parent_node.id;
  node.parentId = new_parentNode.id;
  const newNode = nodeZIndexPlus(node)
  new_parentNode.children.push(newNode);
  return new_parentNode;
};

export const debounce=(func,wait)=>{
  let timer=null;
  return function(){
    if(timer) clearTimeout(timer);
    timer=setTimeout(()=>{
      func.apply(this,arguments);
    },wait)
  }

}
