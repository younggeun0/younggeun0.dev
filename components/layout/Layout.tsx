import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ShareIcon from "@mui/icons-material/Share";
import { Alert, Box, Snackbar } from "@mui/material";
import React, { useState } from "react";

import { Comments } from "../Comments";

import Footer from "./Footer";
import Header from "./Header";
import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode
    commentable?: boolean
    alertMessage?: string
}

export default function Layout({ children, commentable = false, alertMessage = '' }: LayoutProps) {
    // TODO, open 코드 공통화(전역 상태 관리 사용)
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <main className={styles.main}>{children}</main>
                {commentable && (
                    <>
                        <Comments />
                        <Box className={styles.post_main}>
                            <ShareIcon
                                fontSize="large"
                                onClick={() => {
                                    const dummy = document.createElement('input')
                                    const text = location.href

                                    document.body.appendChild(dummy)
                                    dummy.value = text
                                    dummy.select()
                                    document.execCommand('copy')
                                    document.body.removeChild(dummy)
                                    setOpen(true)
                                }}
                                sx={{
                                    mr: '1rem',
                                }}
                            />
                            <ArrowCircleUpIcon
                                fontSize="large"
                                onClick={() => {
                                    document.body.scrollTop = 0
                                    document.documentElement.scrollTop = 0
                                }}
                            />
                        </Box>
                    </>
                )}
                <Footer />
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
