import React from "react";
import utilStyles from "../styles/utils.module.css";
import LinkPageCard from "./LinkPageCard";
import { pageObj } from "../types";

type pageListProps = {
    title: string;
    pages: pageObj[];
};

export default function PageList({ title, pages }: pageListProps) {
    return (
        <>
            <div className={utilStyles.rotateTitleBy1Deg}>
                <span className={utilStyles.headingXl}>{title}</span>
            </div>
            <ul className={utilStyles.list} style={{ marginTop: "10px" }}>
                {pages.map((page: pageObj) => (
                    <li className={utilStyles.listItem} key={page.id}>
                        <LinkPageCard page={page} />
                    </li>
                ))}
            </ul>
        </>
    );
}