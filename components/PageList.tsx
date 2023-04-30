import React from "react";
import utilStyles from "../styles/utils.module.css";
import LinkPageCard from "./LinkPageCard";
import { Page } from '../types'

interface PageListProps {
    title: string
    pages: Page[]
}

export default function PageList({ title, pages }: PageListProps) {
    // console.log('🚀 ~ file: PageList.tsx:12 ~ PageList ~ pages:', pages)
    // TODO: pagination

    return (
        <>
            <div className={utilStyles.rotateTitleBy1Deg}>
                <span className={utilStyles.headingXl}>{title}</span>
            </div>
            <ul className={utilStyles.list} style={{ marginTop: '10px' }}>
                {pages.map((page: Page) => (
                    <li className={utilStyles.listItem} key={page.id}>
                        <LinkPageCard page={page} />
                    </li>
                ))}
            </ul>
        </>
    )
}