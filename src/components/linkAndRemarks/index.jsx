import React, { useContext } from 'react';

import Modal from '@components/Modal';
import Styles from './index.css';
import Link from './link'
import { context } from "@context";
import useGlobal from "@context/reducer/global/useGlobal";
import useNodeData from "@context/reducer/nodeData/useNodeData";


const LinkAndRemarks = () => {
  const {
    global: { state: { modalLinkAndRemarks } },
    nodeState: { state: { currentNode } }
  } = useContext(context);

  const useGlobalHook = useGlobal();
  const useNodeDataHook = useNodeData();

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
      id:currentNode,
      link: {
        url: val.link,
        remarks: val.remarks
      }
    }
    useNodeDataHook.modifyContent(obj);
    cancel()
  }

  if (!modalLinkAndRemarks) {
    return null;
  }
  return (
    <Modal visible={true} title="链接" onCancel={cancel}>
      <Link btnStyles={btnStyles} onSub={sumBit} onCancel={cancel} />
    </Modal>
  )
}

export default LinkAndRemarks;
