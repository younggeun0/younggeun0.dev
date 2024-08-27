import React from "react";

import { Tag, Page } from '../types'

import Date from "./DateComp";
import TagChip from "./TagChip";

interface PageSubInfoProps {
    page: Page
}

export default function PageSubInfo({ page: { subtitle, tags, date } }: PageSubInfoProps) {
    return (
        <div style={{ color: 'grey', display: 'flex', flexDirection: 'column' }}>
            <small style={{ margin: '10px 0' }}>{subtitle}</small>
            <small>
                {tags.map((tag: Tag) => (
                    <TagChip key={tag.id} tag={tag} />
                ))}
            </small>
            <small style={{ marginTop: '5px' }}>
                <Date dateString={date} />
            </small>
        </div>
    )
}