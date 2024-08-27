
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Tooltip } from "@mui/material";
import { useRouter } from 'next/router'
import React from "react";

export default function Footer() {
    const router = useRouter();
    
    return (
        <footer style={{ marginTop: '70px', textAlign: 'center' }}>
            <div>
                <Tooltip title="young's Github">
                    <GitHubIcon
                        sx={{ marginRight: '16px', ':hover': { cursor: 'pointer' } }}
                        onClick={() => {
                            router.push('https://github.com/younggeun0')
                        }}
                    />
                </Tooltip>
                <Tooltip title="young's Email">
                    <EmailIcon
                        sx={{ ':hover': { cursor: 'pointer' } }}
                        onClick={() => {
                            router.push('mailto:dureng5@gmail.com')
                        }}
                    />
                </Tooltip>
            </div>
            <small>© 2022-present Younggeun Oh. All Rights Reserved.</small>
        </footer>
    )
}