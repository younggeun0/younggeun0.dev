import { Client } from '@notionhq/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const notion = new Client({ auth: process.env.NOTION_KEY })
const pomodoroDatabaseId = process.env.NOTION_POMODORO_DATABASE_ID as string

export default async (req: any, res: any) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.statusCode = 401
        res.send({
            error: 'Unauthorized',
        })
        return
    }

    // TODO, 다른 계정으로 로그인 시 작성안되게 막히는지 확인 필요
    if (req.method === 'POST') {
        try {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const { results } = await notion.databases.query({
                database_id: pomodoroDatabaseId,
                filter: {
                    created_time: {
                        after: today.toISOString(),
                    },
                    timestamp: 'created_time',
                },
                sorts: [
                    {
                        timestamp: 'created_time',
                        direction: 'ascending',
                    },
                ],
            })

            if (results.length > 0) {
                // 이미 등록된 오늘자 포모도로 페이지가 있으면 기존 페이지에 🍅 추가
                const page = results[0]
                const previousTitle = (page as any).properties.name.title[0].text.content
                const tokens = previousTitle.split(' ')
                await notion.pages.update({
                    page_id: page.id as string,
                    properties: {
                        name: {
                            title: [
                                {
                                    text: {
                                        content: `🍅 * ${parseInt(tokens[tokens.length - 1]) + 1}`,
                                    },
                                },
                            ],
                        },
                    },
                })
                res.statusCode = 200
            } else {
                // 새로운 페이지가 없으면 새로 생성
                await notion.pages.create({
                    parent: {
                        type: 'database_id',
                        database_id: pomodoroDatabaseId,
                    },
                    properties: {
                        name: {
                            title: [
                                {
                                    text: {
                                        content: '🍅 * 1',
                                    },
                                },
                            ],
                        },
                    },
                })
                res.statusCode = 201
            }
            res.send()
        } catch (e) {
            console.error(e)

            res.statusCode = 500
            res.send({
                error: 'Fail to create or update pomodoro page',
            })
        }
    }
}
