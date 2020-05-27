const keyValue = key => {
  switch (key.keyCode) {
    case 113:
      return 'edit';
    case 46:
      return 'deleteNode';
    case 38:
      if (key.altKey) {
        return 'moveUp';
      }
      return null;
    case 40:
      if (key.altKey) {
        return 'moveDown';
      }
      return null;
    case 9:
      if (key.shiftKey) {
        return 'addParent'
      }
      return 'addChild';
    case 13:
      return 'addSub';
  }
}

const hotKey = api => {
  return event => {
    const eventName = keyValue(event);
    if(eventName){
      const runEvent = api[eventName];
      runEvent();
    }
  }
};

export default hotKey;