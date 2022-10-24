import React from "react";
import TagChip from "./TagChip";
import Date from "./DateComp";
import { tagObj, pageObj } from "../types";

export default function PageSubInfo({ page }: { page: pageObj }) {
    return (
        <div style={{ color: "grey", display: "flex", flexDirection: "column" }}>
            <small style={{ margin: "10px 0" }}>{page.subtitle}</small>
            <small>
                {page.tags.map((tag: tagObj) => (
                    <TagChip tag={tag} />
                ))}
            </small>
            <small style={{ marginTop: "5px" }}>
                <Date dateString={page.date} />
            </small>
        </div>
    );
}