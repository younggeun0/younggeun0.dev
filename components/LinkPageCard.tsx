import React from "react";
import Link from "next/link";
import PageSubInfo from "./PageSubInfo";
import { Card, CardContent } from "@mui/material";
import { Page, Tag } from 'types'
import { IMAGE_SIZE } from 'lib/constants'
import Image from 'next/image'

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
                            <Image
                                src={page.icon.external?.url!}
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
