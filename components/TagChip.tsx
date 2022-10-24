import React from "react";
import { tagObj } from "../types";

export default function TagChip({ tag }: { tag: tagObj }) {
    return (
        <span
            key={tag.id}
            style={{
                borderRadius: "4px",
                border: "1px solid grey",
                padding: "2px",
                marginRight: "5px",
                color: "grey",
            }}
        >
            {tag.name}
        </span>
    );
}