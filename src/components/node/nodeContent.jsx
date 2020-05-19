import React from 'react';
import cssModule from "./index.css";

const Text = props => <div dangerouslySetInnerHTML={{ __html: props.data }} />;

const Icon = props => (
  <div>{props.data.map(item => {
    if(item){
      return <img key={item.sort} className={cssModule.content_img} src={item.url} alt="" />
    }
    return null
  })}</div>
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
