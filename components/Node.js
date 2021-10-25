import { Box, Button, Card, CardActions, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTree } from "../components/TreeContext";

const Node = ({ id, sub, children }) => {
    // States
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    // References to the current Tree context
    const tree = useTree();
    const selected = tree.selected;

    const handleOpen = () => {
        setOpen(!open);
    };

    // Called every time the selected nodes object is updated
    useEffect(() => {
        if (sub) {
            var count = 0;
            sub.forEach((child) => {
                if (selected[child.id]) {
                    count++;
                }
            });
            if (count == sub.length && !selected[id]) {
                tree.addChildren({ id: id });
            }
            if (count < sub.length && selected[id]) {
                tree.removeChildren({ id: id });
            }
        }
        setIndeterminate(count > 0 && count < sub.length);
        setChecked(selected[id]);
    }, [selected]);

    // Remove or add all nodes under the checked one (including itself)
    const handleChecked = () => {
        if (selected[id]) {
            tree.removeChildren({ id: id, sub: sub });
        } else {
            tree.addChildren({ id: id, sub: sub });
        }
    };

    return (
        <>
            <Box pt={1} sx={{ borderRadius: 1, pl: 1 }}>
                <Card
                    sx={{ maxWidth: 200, background: "#ececec", boxShadow: 0 }}
                >
                    <CardActions>
                        <Checkbox
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={handleChecked}
                        />
                        {children ? (
                            <Button
                                onClick={handleOpen}
                                style={{ textTransform: "none" }}
                            >
                                {open ? "Close" : "Open"}
                            </Button>
                        ) : null}
                    </CardActions>
                </Card>
            </Box>
            {open ? <Box pl={3}>{children}</Box> : null}
        </>
    );
};

export default Node;
