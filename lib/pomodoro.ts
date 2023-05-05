import { Client } from '@notionhq/client'
import dayjs from 'dayjs'
import { PomodoroInfo } from 'types'

const notion = new Client({ auth: process.env.NOTION_KEY })
const pomodoroDatabaseId = process.env.NOTION_POMODORO_DATABASE_ID

export async function getAllPomododoroInfo(): Promise<PomodoroInfo[]> {
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

        if (response.results.length > 0) {
            return response.results.map((page: any) => {
                const titleTokens = page.properties.name.title[0].text.content.split(' ')
                const count = Number(titleTokens[titleTokens.length - 1])

                return {
                    date: dayjs(page.created_time).format('YYYY-MM-DD'),
                    count,
                }
            })
        }
        return []
    } catch (error) {
        console.error(error)
        return []
    }
}
