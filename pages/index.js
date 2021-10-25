import React from "react";
import Button from "@mui/material/Button";
import Tree from "../components/Tree";
import { TreeProvider } from "../components/TreeContext";

const demoTree = [
    {
        id: 0,
        content: [
            { id: 1 },
            { id: 2 },
            {
                id: 3,
                content: [{ id: 4 }, { id: 5 }],
            },
            {
                id: 6,
                content: [{ id: 7 }, { id: 8 }],
            },
        ],
    },
    {
        id: 9,
        content: [
            { id: 10 },
            { id: 11 },
            {
                id: 12,
                content: [{ id: 13 }, { id: 14 }],
            },
            {
                id: 15,
                content: [{ id: 16 }, { id: 17 }],
            },
            { id: 18 },
        ],
    },
    {
        id: 19,
        content: [
            { id: 20 },
            { id: 21 },
            {
                id: 22,
                content: [{ id: 23 }, { id: 24 }],
            },
            {
                id: 25,
                content: [{ id: 26 }, { id: 27 }],
            },
        ],
    },
    { id: 28 },
];

export default function Home() {
    return (
        <TreeProvider>
            <Tree tree={demoTree} />
        </TreeProvider>
    );
}
