import React, { useState } from 'react';
import Styles from './index.css'

const Link = props => {
  const { btnStyles, onSub, onCancel } = props
  const [val, setVal] = useState({ link: '', remarks: '' });

  return (
    <form>
      <div className={Styles.link}>
        <label htmlFor="">请输入链接</label>
        <input
          value={val.link}
          onChange={e => setVal({ ...val, link: e.target.value })}
          placeholder="必填：以 http(s):// 或 ftp:// 开头"
          type="text" />
      </div>
      <div className={Styles.link}>
        <label htmlFor="">请输入备注</label>
        <input
          value={val.remarks}
          onChange={e => setVal({ ...val, remarks: e.target.value })}
          type="text" />
      </div>
      <div className={Styles.footer}>
        <button
        type="button" 
        disabled={!val.link} 
        style={{...btnStyles}}
        className={Styles.button}
        onClick={()=>{onSub(val)}}>确 认</button>
        <button type="button" onClick={()=>onCancel()} className={Styles.button}>取 消</button>
      </div>
    </form>
  )
}

export default Link;
