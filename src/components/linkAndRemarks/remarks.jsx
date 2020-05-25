import React, { useRef, useState } from 'react';
import Styles from './index.css'

const Remarks = props => {
  const { btnStyles, onSub, onCancel } = props
  const [val,setVal] = useState('');

  return (
    <div>
      <div>
        <div
          contentEditable="true"
          onInput={e=>setVal(e.target.innerHTML)}
          className={Styles.textarea} />
      </div>
      <div className={Styles.footer}>
        <button
          type="button"
          disabled={!val}
          style={{ ...btnStyles }}
          className={Styles.button}
          onClick={() => { onSub(val) }}>确 认</button>
        <button type="button" onClick={() => onCancel()} className={Styles.button}>取 消</button>
      </div>
    </div>
  )
}

export default Remarks;
