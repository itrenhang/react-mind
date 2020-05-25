import React, { useState } from "react";
import cssModule from "./index.css";
import EditContainer from "./edit.jsx";
import Popconfirm from '@components/popconfirm'

const Text = props => <div dangerouslySetInnerHTML={{ __html: props.data }} />;

const Icon = props => (
  <div>
    {props.data.map(item => (<img
      key={item.sort}
      className={cssModule.content_img}
      src={item.url}
      alt="" />))}
  </div>
);

const Link = props => (
  <a className={cssModule.link} href={props.data.url} title={props.data.remarks} target="_blank">
    <img src="/assets/img/link.png" alt="" />
  </a>
);

const Remarks = props => {
  const [isVis, setIsVis] = useState(false);

  return (
    <div
      className={cssModule.remarks}
      onMouseOver={() => setIsVis(true)}
      onMouseOut={() => { setIsVis(false) }}>
      <img src="/assets/img/remarks.png" alt="" />
      <Popconfirm style={{width:'148px'}} visible={isVis}>
        {props.data}
      </Popconfirm>
    </div>
  )
}

const Expended = ({ data, setExpend }) => {
  const content = data.expanded ? '-' : '+';
  if (data.ZIndex == 1 || data.children.length < 1) {
    return null;
  }
  return (
    <div className={cssModule.expander} onClick={setExpend} onDoubleClick={e => e.stopPropagation()}>{content}</div>
  )
};

const NodeContent = props => {
  const { className, canEdit, finishEditing, data } = props;
  const { text = "", icon = [], link = {}, remarks = "" } = data.content;
  const newClass = `${className} ${cssModule.content_container}`;

  return (
    <>
      <div className={newClass}>
        {icon.length > 0 && <Icon data={icon} />}
        <div style={{ position: "relative" }}>
          {text && <Text data={text} />}
          {canEdit && (
            <EditContainer finishEditing={finishEditing}>{text}</EditContainer>
          )}
        </div>
        {'url' in link && <Link data={link} />}
        {remarks && <Remarks data={remarks} />}
      </div>
      <Expended data={data} setExpend={props.setExpend} />
    </>
  );
};

export default NodeContent;
