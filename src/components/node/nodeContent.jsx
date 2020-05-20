import React from 'react';

import cssModule from "./index.css";
import EditContainer from "./edit.jsx";


const Text = props => <div dangerouslySetInnerHTML={{ __html: props.data }} />;

const Icon = props => (
  <div>{props.data.map(item => {
    if (item) {
      return <img key={item.sort} className={cssModule.content_img} src={item.url} alt="" />
    }
    return null
  })}</div>
);

const NodeContent = props => {
  const { content, className, canEdit, finishEditing } = props;
  const { text = '', icon = [] } = content;
  const newClass = `${className} ${cssModule.content_container}`

  return (
    <div className={newClass}>
      {icon.length > 0 && <Icon data={icon} />}
      <div style={{ position: 'relative' }}>
        {text && <Text data={text} />}
        { canEdit &&
          <EditContainer finishEditing={finishEditing}>
            {text}
          </EditContainer> }
      </div>
    </div>
  )
}

export default NodeContent;
