import React from 'react';

import Styles from './index.css'

const Popconfirm = props => {
  const { visible, style } = props;

  const newStyle = {
    ...style,
    display: visible ? 'inline-block' : 'none',
  }

  return (
    <div>
      <div
        style={{ ...newStyle }}
        dangerouslySetInnerHTML={{ __html: props.children }}
        className={Styles.popconfirm} />
    </div>
  )
}

export default Popconfirm;