import React, { useContext } from 'react';

import Modal from '@components/Modal';
import Styles from './index.css';
import Link from './link'
import { context } from "@context";
import useGlobal from "@context/reducer/global/useGlobal";
import useNodeData from "@context/reducer/nodeData/useNodeData";
import Remarks from './remarks';


const LinkAndRemarks = () => {
  const {
    global: { state: { modalLinkAndRemarks } },
    nodeState: { state: { currentNode } }
  } = useContext(context);

  const useGlobalHook = useGlobal();
  const useNodeDataHook = useNodeData();

  const isLink = modalLinkAndRemarks === 'link';

  const btnStyles = {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    color: '#fff'
  }

  const cancel = () => {
    useGlobalHook.setModalLinkAndRemarks('');
  }

  const sumBit = val => {
    const obj = {
      id: currentNode,
    }
    if (isLink) {
      obj.link = {
        url: val.link,
        remarks: val.remarks
      }
    }else{
      obj.remarks = val;
    }
    useNodeDataHook.modifyContent(obj);
    cancel()
  }

  if (!modalLinkAndRemarks) {
    return null;
  }
  return (
    <Modal visible={true} title={isLink ? '链接' : '备注'} onCancel={cancel}>
      {
        isLink ?
          <Link btnStyles={btnStyles} onSub={sumBit} onCancel={cancel} /> :
          <Remarks btnStyles={btnStyles} onSub={sumBit} onCancel={cancel} />
      }
    </Modal>
  )
}

export default LinkAndRemarks;
