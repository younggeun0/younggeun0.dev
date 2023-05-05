import { Client } from '@notionhq/client'
import { Page } from 'types'

const notion = new Client({ auth: process.env.NOTION_KEY })
const pomodoroDatabaseId = process.env.NOTION_POMODORO_DATABASE_ID

export async function getAllPomododoro(): Promise<Page[]> {
    try {
        const response = await notion.databases.query({
            database_id: pomodoroDatabaseId as string,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ],
        })

        // console.log(response)

        return []
    } catch (error) {
        console.error(error)
        return []
    }
}
