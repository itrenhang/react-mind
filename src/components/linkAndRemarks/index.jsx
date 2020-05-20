import React, { useState } from 'react';

import Modal from '@components/Modal';

const Link = () => {
  const [val, setVal] = useState({});

  return (
    <form>
      <div>
        <label htmlFor="">请输入链接</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">请输入备注</label>
        <input type="text" />
      </div>
    </form>
  )
}

const LinkAndRemarks = props => {
  const { type } = props;


  return (
    <Modal visible={true}>
      <Link />
    </Modal>
  )
}

export default LinkAndRemarks;
