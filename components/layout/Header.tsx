import React, { useContext, useEffect, useRef, useState } from "react"
import utilStyles from "../../styles/utils.module.css"
import Link from "next/link"
import { Box, Tooltip } from "@mui/material"
import styles from "./layout.module.css"
import { ThemeContext } from "context/ThemeContext"
import { useRouter } from "next/router"
import { useAtom } from "jotai"
import { showTopNavAtom } from "lib/jotaiStore"

export default function Header() {
    const [showTopNav, setShowTopNav] = useAtom(showTopNavAtom)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [headerHeight, setHeaderHeight] = useState(0)
    const router = useRouter()

    let oldScrollTop = 0
    useEffect(() => {
        const headerHeight = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize)

        function setShowNavByCurrentScroll() {
            if (headerHeight > window.scrollY) {
                setShowTopNav(true)
                oldScrollTop = 0
                return
            }

            if (oldScrollTop > window.scrollY) {
                setShowTopNav(true)
            } else {
                setShowTopNav(false)
            }
            oldScrollTop = window.scrollY
        }

        window.addEventListener("load", setShowNavByCurrentScroll)
        window.addEventListener("scroll", setShowNavByCurrentScroll)
        router.events.on("routeChangeStart", setShowNavByCurrentScroll)

        setHeaderHeight(headerHeight)
    }, [])

    return (
        <header className={styles.header} style={{ height: "3rem", top: showTopNav ? 0 : -headerHeight }}>
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
                                e.stopPropagation()
                                toggleTheme()
                            }}
                        >
                            {theme.type === "dark" ? "🌞" : "🌚"}
                        </span>
                    </Tooltip>
                )}
            </Box>
        </header>
    )
}
