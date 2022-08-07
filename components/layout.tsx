import React, { useContext, useState } from "react";
import styles from "./layout.module.css";
import ShareIcon from "@mui/icons-material/Share";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Alert, Box, Snackbar, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Comments } from "../components/comment";
import { ThemeContext } from "context/ThemeContext";

export default function Layout({ children, commentable = false, alertMessage = "" }: any) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const router = useRouter();
    const { data: session, status } = useSession();
    // TODO, open 코드 공통화(전역 상태 관리 사용)
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <header className={styles.header}>
                <Box sx={{ display: "flex", alignItems: "center", ":hover": { cursor: "pointer" } }}>
                    <Link href="/">
                        <span className={utilStyles.headingLg}>(younggeun0: 🐢) =&gt; dev</span>
                    </Link>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {theme && (
                        <Tooltip title="Theme">
                            <span
                                className={styles.menu}
                                onClick={e => {
                                    e.stopPropagation();
                                    toggleTheme();
                                }}
                            >
                                {theme.type === "dark" ? "🌞" : "🌚"}
                            </span>
                        </Tooltip>
                    )}

                    <Tooltip title="About">
                        <a className={styles.menu} href="/about">
                            🙋🏻‍♂️
                        </a>
                    </Tooltip>
                    <Tooltip title="Posts">
                        <a className={styles.menu} href="/posts">
                            📝
                        </a>
                    </Tooltip>
                    <Tooltip title="Projects">
                        <a className={styles.menu} href="/projects">
                            🧑🏻‍💻
                        </a>
                    </Tooltip>
                    <Tooltip title="younggeun0's Github">
                        <GitHubIcon
                            sx={{ marginRight: "16px", ":hover": { cursor: "pointer" } }}
                            onClick={() => {
                                location.href = "https://github.com/younggeun0";
                            }}
                        />
                    </Tooltip>
                </Box>
            </header>
            <hr style={{ margin: 0 }} />
            <div className={styles.container}>
                <main>{children}</main>
                {commentable && (
                    <>
                        <Comments />
                        <Box className={styles.post_main}>
                            <Box>
                                <ArrowCircleLeftIcon fontSize="large" onClick={() => router.back()} />
                            </Box>
                            <Box>
                                <ShareIcon
                                    fontSize="large"
                                    onClick={() => {
                                        const dummy = document.createElement("input");
                                        const text = location.href;

                                        document.body.appendChild(dummy);
                                        dummy.value = text;
                                        dummy.select();
                                        document.execCommand("copy");
                                        document.body.removeChild(dummy);
                                        setOpen(true);
                                    }}
                                    sx={{
                                        mr: "1rem",
                                    }}
                                />
                                <ArrowCircleUpIcon
                                    fontSize="large"
                                    onClick={() => {
                                        document.body.scrollTop = 0;
                                        document.documentElement.scrollTop = 0;
                                    }}
                                />
                            </Box>
                        </Box>
                    </>
                )}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
