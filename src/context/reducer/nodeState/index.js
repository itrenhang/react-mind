export const nodeState = {
  state: {
    currentNode: '',
    editNode: '',
  },
  reducers(state, action) {
    const { payload = null } = action;
    switch (action.type) {
      case 'nodeState/selectNode':
        return {
          ...state,
          currentNode: payload.current,
          editNode: payload.edit,
        };
      default:
        return state;
    }
  }
};
