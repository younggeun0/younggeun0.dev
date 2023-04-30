import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'

interface PagenationProps {
    currentPage: number
    changePage: (page: number) => void
    lastPage: number
}

export default function Pagination({ currentPage, changePage, lastPage }: PagenationProps) {
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === lastPage

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FirstPageIcon
                role="button"
                onClick={() => {
                    if (isFirstPage) return
                    changePage(1)
                }}
                style={{ marginRight: '15px', ...(isFirstPage ? { color: 'grey' } : {}) }}
            />
            <ChevronLeftIcon
                role="button"
                onClick={() => {
                    if (isFirstPage) return
                    changePage(currentPage - 1)
                }}
                style={{ marginRight: '15px', ...(isFirstPage ? { color: 'grey' } : {}) }}
            />
            <span
                style={{
                    fontSize: '1.2rem',
                }}
            >
                {currentPage}
            </span>
            <ChevronRightIcon
                role="button"
                onClick={() => {
                    if (isLastPage) return
                    changePage(currentPage + 1)
                }}
                style={{ marginLeft: '15px', ...(isLastPage ? { color: 'grey' } : {}) }}
            />
            <LastPageIcon
                role="button"
                onClick={() => {
                    if (isLastPage) return
                    changePage(lastPage)
                }}
                style={{ marginLeft: '15px', ...(isLastPage ? { color: 'grey' } : {}) }}
            />
        </div>
    )
}
