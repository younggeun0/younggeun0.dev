import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import { useRouter } from 'next/router'

interface PagenationProps {
    currentPage: number
    lastPage: number
}

export default function Pagination({ currentPage, lastPage }: PagenationProps) {
    const router = useRouter()
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === lastPage

    function changePage(page: number) {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FirstPageIcon
                onClick={() => {
                    if (isFirstPage) return
                    changePage(1)
                }}
                style={{
                    cursor: isFirstPage ? 'default' : 'pointer',
                    marginRight: '15px',
                    ...(isFirstPage ? { color: 'grey' } : {}),
                }}
            />
            <ChevronLeftIcon
                onClick={() => {
                    if (isFirstPage) return
                    changePage(currentPage - 1)
                }}
                style={{
                    cursor: isFirstPage ? 'default' : 'pointer',
                    marginRight: '15px',
                    ...(isFirstPage ? { color: 'grey' } : {}),
                }}
            />
            <span
                style={{
                    fontSize: '1.2rem',
                }}
            >
                {currentPage}
            </span>
            <ChevronRightIcon
                onClick={() => {
                    if (isLastPage) return
                    changePage(currentPage + 1)
                }}
                style={{
                    cursor: isLastPage ? 'default' : 'pointer',
                    marginLeft: '15px',
                    ...(isLastPage ? { color: 'grey' } : {}),
                }}
            />
            <LastPageIcon
                onClick={() => {
                    if (isLastPage) return
                    changePage(lastPage)
                }}
                style={{
                    cursor: isLastPage ? 'default' : 'pointer',
                    marginLeft: '15px',
                    ...(isLastPage ? { color: 'grey' } : {}),
                }}
            />
        </div>
    )
}
