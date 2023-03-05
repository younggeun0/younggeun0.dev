import React from "react";
import Link from "next/link";
import PageSubInfo from "./PageSubInfo";
import { Card, CardContent } from "@mui/material";
import { pageObj, tagObj } from "types";

type linkPageCardProps = {
    page: pageObj;
};

export default function LinkPageCard({ page }: linkPageCardProps) {
    const imgSize = 35

    return (
        <Link href={`/post/${page.id}`}>
            <Card sx={{ boxShadow: "none", border: "1px solid grey" }}>
                <CardContent>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {page.icon?.type === "external" && (
                            <img
                                src={page.icon.external?.url}
                                width={imgSize}
                                height={imgSize}
                                style={{
                                    display: "inline-flex",
                                    margin: 0,
                                    marginRight: "15px",
                                    minWidth: imgSize,
                                    maxWidth: imgSize,
                                    objectFit: "contain",
                                }}
                            />
                        )}
                        {page.icon?.type === "emoji" && (
                            <div
                                style={{
                                    fontSize: imgSize,
                                    marginRight: "15px",
                                }}
                            >
                                {page.icon.emoji}
                            </div>
                        )}
                        <h2 style={{ margin: 0 }}>
                            <a>{page.title}</a>
                        </h2>
                    </div>
                    <PageSubInfo page={page} />
                </CardContent>
            </Card>
        </Link>
    )
}
