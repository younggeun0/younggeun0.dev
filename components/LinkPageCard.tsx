import React from "react";
import Link from "next/link";
import PageSubInfo from "./PageSubInfo";
import { Card, CardContent } from "@mui/material";
import { pageObj, tagObj } from "types";

type linkPageCardProps = {
    page: pageObj;
};

export default function LinkPageCard({ page }: linkPageCardProps) {
    return (
        <Link href={`/post/${page.id}`}>
            <Card sx={{ boxShadow: "none", border: "1px solid grey" }}>
                <CardContent>
                    <h2 style={{ margin: 0 }}>
                        <a>{page.title}</a>
                    </h2>
                    <PageSubInfo page={page} />
                </CardContent>
            </Card>
        </Link>
    );
}
