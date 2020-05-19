import React from 'react';
import cssModule from "./index.css";

const Text = props => <div dangerouslySetInnerHTML={{ __html: props.data }} />;

const Icon = props => (
  <div>{props.data.map(item => (
    <img className={cssModule.content_img} src={item.url} alt="" />
  ))}</div>
);

const NodeContent = props => {

  const { content, className } = props;
  const { text = '', icon = [] } = content;
  console.log(icon);
  const newClass = `${className} ${cssModule.content_container}`

  return (
    <div className={newClass}>
      {icon.length > 0 && <Icon data={icon} />}
      {text && <Text data={text} />}
    </div>
  )
}

export default NodeContent;
