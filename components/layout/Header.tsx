import React, { useContext, useEffect, useRef } from 'react'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import { Box, Tooltip } from '@mui/material'
import styles from './layout.module.css'
import { ThemeContext } from 'context/ThemeContext'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { showTopNavAtom } from 'lib/jotaiStore'

export default function Header() {
    const [showTopNav, setShowTopNav] = useAtom(showTopNavAtom)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const headerHeight = useRef(0)
    const router = useRouter()

    let oldScrollTop = 0
    useEffect(() => {
        headerHeight.current = parseInt(getComputedStyle(document.body).getPropertyValue('--header-height'))

        function setShowNavByCurrentScroll() {
            if (headerHeight.current > window.scrollY) {
                setShowTopNav(true)
                oldScrollTop = 0
                return
            }

            if (oldScrollTop >= window.scrollY) {
                setShowTopNav(true)
            } else {
                setShowTopNav(false)
            }
            oldScrollTop = window.scrollY
        }

        window.addEventListener('load', setShowNavByCurrentScroll)
        window.addEventListener('scroll', setShowNavByCurrentScroll)
        router.events.on('routeChangeStart', setShowNavByCurrentScroll)
    }, [])

    return (
        <header className={styles.header} style={{ top: showTopNav ? 0 : -headerHeight.current }}>
            <Box sx={{ display: 'flex', alignItems: 'center', ':hover': { cursor: 'pointer' } }}>
                <Link href="/">
                    <span className={utilStyles.headingXl}>(younggeun0: 🐢) =&gt; dev</span>
                </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Tooltip title="Pomodoro">
                    <Link href="/pomodoro">
                        <span className={styles.menu}>🍅</span>
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
                            {theme.type === 'dark' ? '🌞' : '🌚'}
                        </span>
                    </Tooltip>
                )}
            </Box>
        </header>
    )
}
