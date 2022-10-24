import React from "react";
import Link from "next/link";
import Date from "./DateComp";
import { Card, CardContent } from "@mui/material";
import { pageObj, tagObj } from "types";

type linkPageCardProps = {
    page: pageObj;
}

export default function LinkPageCard({ page }: linkPageCardProps) {
    return (
        <Link href={`/post/${page.id}`}>
            <Card sx={{ boxShadow: "none", border: "1px solid grey" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                    <h2 style={{ margin: "5px 0" }}><a>{page.title}</a></h2>
                    <div>
                        {page.tags.map((tag: tagObj) => (
                            <span
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
                        ))}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <small style={{ color: "grey" }}>
                            <Date dateString={page.date} />
                        </small>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};