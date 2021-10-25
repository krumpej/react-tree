import { createContext, useContext, useState } from "react";

const treeContext = createContext();

const TreeProvider = ({ children }) => {
    const treeProvider = useTreeProvider();
    return (
        <treeContext.Provider value={treeProvider}>
            {children}
        </treeContext.Provider>
    );
};

const useTree = () => {
    return useContext(treeContext);
};

const useTreeProvider = () => {
    // List containing the IDs of selected nodes
    const [selected, setSelected] = useState({});
    // Mutable copy of selected
    var copyOfSelected = {};

    const removeChildren = ({ id, sub }) => {
        copyOfSelected = JSON.parse(JSON.stringify(selected));
        delete copyOfSelected[id];
        // Visit every node if its not a leaf
        if (sub) {
            removeHelper(sub);
        }
        setSelected(copyOfSelected);
    };

    const addChildren = ({ id, sub }) => {
        copyOfSelected = JSON.parse(JSON.stringify(selected));
        copyOfSelected[id] = {};
        // Visit every node if its not a leaf
        if (sub) {
            addHelper(sub);
        }
        setSelected(copyOfSelected);
    };

    const removeHelper = (sub) => {
        sub.forEach((child) => {
            delete copyOfSelected[child.id];
            if (child.content) {
                removeHelper(child.content);
            }
        });
    };

    const addHelper = (sub) => {
        sub.forEach((child) => {
            copyOfSelected[child.id] = {};
            if (child.content) {
                addHelper(child.content);
            }
        });
    };

    return {
        selected,
        removeChildren,
        addChildren,
    };
};

export { TreeProvider, useTree };
