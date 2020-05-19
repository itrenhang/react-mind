import React, { useEffect } from 'react';
import cssModule from './index.css';


const editContainer = props => {
  const { finishEditing } = props
  const ref = React.createRef(null);

  // 发送编辑成功
  const finish = () => {
    const content = ref.current.innerHTML;
    finishEditing(content);
  }

  useEffect(() => {
    ref.current.focus();
    const el = ref.current;
    if (window.getSelection) {//ie11 10 9 ff safari
      const range = window.getSelection();//创建range
      range.selectAllChildren(el);//range 选择el下所有子内容
      range.collapseToEnd();//光标移至最后
    }
    else if (document.selection) {//ie10 9 8 7 6 5
      const range = document.selection.createRange();//创建选择对象
      range.moveToElementText(el);//range定位到obj
      range.collapse(false);//光标移至最后
      range.select();
    }
    return finish;
  }, [])

  const keyDown = e => {
    const { keyCode, shiftKey } = e
    if (keyCode === 13 && shiftKey) {
    } else if (keyCode === 13) {
      e.preventDefault();
      e.returnValue = false;
      finish();
    }
  }

  return (
    <div
      onKeyDown={keyDown}
      onClick={e => e.stopPropagation()}//阻止冒泡 防止重复选择以及意外关闭
      className={cssModule.node_edit_container}
      suppressContentEditableWarning
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: props.children }}
      ref={ref} />
  )
}

export default editContainer;