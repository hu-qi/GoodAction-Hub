import { NextResponse } from 'next/server'
import yaml from 'yaml'
import fs from 'fs'
import { DeadlineItem } from '@/lib/data'

// 保证在 Node.js 运行时执行（Netlify 需要 Node 运行时以支持 fs）
export const runtime = 'nodejs'
// 路由输出可做静态化（数据源为仓库内 YAML 文件）
export const dynamic = 'force-static'

function loadData(): DeadlineItem[] {
  // 使用 import.meta.url 基于当前文件位置解析到仓库内的 data 目录，避免 process.cwd() 在函数运行时变化
  const conferencesUrl = new URL('../../../data/conferences.yml', import.meta.url)
  const competitionsUrl = new URL('../../../data/competitions.yml', import.meta.url)
  const activitiesUrl = new URL('../../../data/activities.yml', import.meta.url)

  const conferencesData = yaml.parse(fs.readFileSync(conferencesUrl, 'utf8')) as DeadlineItem[]
  const competitionsData = yaml.parse(fs.readFileSync(competitionsUrl, 'utf8')) as DeadlineItem[]
  const activitiesData = yaml.parse(fs.readFileSync(activitiesUrl, 'utf8')) as DeadlineItem[]

  return [...conferencesData, ...competitionsData, ...activitiesData]
}

export async function GET() {
  try {
    const data = loadData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load data:', error)
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}
