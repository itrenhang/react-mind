import React from "react";
import Node from "../../node";
import cssModule from './index.css';

const SubNode = ({node, node_refs}) => {
  return (
    <div className={cssModule.nodeContainer}>
      <Node data={node} node_refs={node_refs} />
      {
        node.expanded && <div>
        {node.children &&
          node.children.map((sub_node) => {
            return <SubNode key={sub_node.id} node={sub_node} node_refs={node_refs} />
          })}
        </div>
      }
    </div>
  );
};

const MindMap = ({node_refs, nodes}) => {
  return (
    <>
      <SubNode node={nodes} node_refs={node_refs} />
    </>
  );
};

export default MindMap;
