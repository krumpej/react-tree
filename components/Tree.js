import React from "react";
import Node from "./Node";

// Recursively builds a tree from a pre-defined JSON structure
const Tree = ({ tree }) => {
    return tree.map((node) => {
        return !node.content ? (
            <Node key={node.id} id={node.id} />
        ) : (
            <Node key={node.id} id={node.id} sub={node.content}>
                <Tree tree={node.content} />
            </Node>
        );
    });
};

export default Tree;
