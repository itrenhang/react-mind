import React, { useContext } from "react";
import { context } from "../../context";
import MindMap from '../listStyle/LogicMap'


const NodeList = ({node_refs}) => {
  const {
    global: { state }
  } = useContext(context);
  const { mindType } = state;

  return (
    <>
      {mindType == "mindMap" && <MindMap node_refs={node_refs} />}
    </>
  );
};

export default React.memo(NodeList);
