import React from "react";
import utilStyles from "../styles/utils.module.css";
import LinkPageCard from "./LinkPageCard";
import { Page } from '../types'
import Pagination from './Pagination'
import { useRouter } from 'next/router'

const PER_PAGE = 5

interface PageListProps {
    title: string
    pages: Page[]
}

export default function PageList({ title, pages }: PageListProps) {
    const router = useRouter()
    const currentPage = router.query.page ? Number(router.query.page) : 1
    const startPageIdx = (currentPage - 1) * PER_PAGE

    return (
        <>
            <div className={utilStyles.rotateTitleBy1Deg}>
                <span className={utilStyles.headingXl}>{title}</span>
            </div>
            <ul className={utilStyles.list} style={{ marginTop: '10px' }}>
                {pages.slice(startPageIdx, startPageIdx + PER_PAGE).map((page: Page) => (
                    <li className={utilStyles.listItem} key={page.id}>
                        <LinkPageCard page={page} />
                    </li>
                ))}
                {title !== '[...recent_posts🔥]' && (
                    <Pagination currentPage={currentPage} lastPage={Math.ceil(pages.length / PER_PAGE)} />
                )}
            </ul>
        </>
    )
}