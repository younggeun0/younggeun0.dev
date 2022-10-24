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
                        🐢
                    </a>
                </Tooltip>
                <Tooltip title="Posts">
                    <a className={styles.menu} href="/posts">
                        📝
                    </a>
                </Tooltip>
            </Box>
        </header>
    );
}