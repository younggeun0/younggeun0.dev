import React, { useContext } from "react";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { Box, Tooltip } from "@mui/material";
import styles from "./layout.module.css";
import { ThemeContext } from "context/ThemeContext";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <header className={styles.header}>
            <Box sx={{ display: "flex", alignItems: "center", ":hover": { cursor: "pointer" } }}>
                <Link href="/">
                    <span className={utilStyles.headingXl}>(younggeun0: 🐢) =&gt; dev</span>
                </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="About">
                    <Link href="/about">
                        <span className={styles.menu}>🐢</span>
                    </Link>
                </Tooltip>
                <Tooltip title="Posts">
                    <Link href="/posts">
                        <span className={styles.menu}>📝</span>
                    </Link>
                </Tooltip>
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
            </Box>
        </header>
    );
}