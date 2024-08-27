import { Card, CardContent } from "@mui/material";
import Link from "next/link";
import React from "react";

import { IMAGE_SIZE } from 'lib/constants'
import { Page } from 'types'

import PageSubInfo from "./PageSubInfo";



type linkPageCardProps = {
    page: Page
}

export default function LinkPageCard({ page }: linkPageCardProps) {
    return (
        <Link href={`/post/${page.id}`}>
            <Card sx={{ boxShadow: 'none', border: '1px solid grey' }}>
                <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {page.icon?.type === 'external' && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={page.icon.external?.url}
                                alt={''}
                                width={IMAGE_SIZE}
                                height={IMAGE_SIZE}
                                style={{
                                    display: 'inline-flex',
                                    margin: 0,
                                    marginRight: '15px',
                                    minWidth: IMAGE_SIZE,
                                    maxWidth: IMAGE_SIZE,
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                        {page.icon?.type === 'emoji' && (
                            <div
                                style={{
                                    fontSize: IMAGE_SIZE,
                                    marginRight: '15px',
                                }}
                            >
                                {page.icon.emoji}
                            </div>
                        )}
                        <h2 style={{ margin: 0 }}>
                            <a>{page.title}</a>
                        </h2>
                    </div>
                    <PageSubInfo page={page} />
                </CardContent>
            </Card>
        </Link>
    )
}
