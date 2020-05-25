import React from "react";
import cssModule from "./index.css";
import EditContainer from "./edit.jsx";

const Text = props => <div dangerouslySetInnerHTML={{ __html: props.data }} />;

const Icon = props => (
  <div>
    {props.data.map(item => {
      if (item) {
        return (
          <img
            key={item.sort}
            className={cssModule.content_img}
            src={item.url}
            alt=""
          />
        );
      }
      return null;
    })}
  </div>
);
const Expended = ({data, setExpend}) => {
  const content = data.expanded?'-':'+';
  if(data.ZIndex == 1 || data.children.length < 1){
    return null;
  }
  return (
    <div className={cssModule.expander} onClick={setExpend} onDoubleClick={e => e.stopPropagation()}>{content}</div>
  )
};

const NodeContent = props => {
  const { className, canEdit, finishEditing, data, isDrag } = props;
  const { text = "", icon = [] } = data.content;
  const newClass = `${className} ${cssModule.content_container}`;

  return (
    <>
      <div className={newClass} draggable="true">
        {isDrag && <div className={cssModule.nodeMask} data-tag="nodeMask"></div>}
        {icon.length > 0 && <Icon data={icon} />}
        <div style={{ position: "relative" }}>
          {text && <Text data={text} />}
          {canEdit && (
            <EditContainer finishEditing={finishEditing}>{text}</EditContainer>
          )}
        </div>
      </div>
      <Expended data={data} setExpend={props.setExpend} />
    </>
  );
};

export default NodeContent;
