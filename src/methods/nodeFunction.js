
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