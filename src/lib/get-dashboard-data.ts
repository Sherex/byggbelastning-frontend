import { request, gql } from 'graphql-request'
import { config } from '../config'

interface LocationsResponse {
  locations: Array<{
    id: number
    clientCount: {
      timespan: Array<{
        time: string
        count: number
      }>
    }
  }>
}

export interface DashboardData {
  id: number
  clients: {
    current: number
    uniqueToday: number
    uniqueYesterday: number
    trend: number[]
  }
}

export async function getDashboardData (): Promise<DashboardData[]> {
  const response = await request<LocationsResponse>(config.apiUrl,
    // TODO: Remove id limit
    gql`
      query getLocations {
        locations {
          id
          clientCount {
            timespan {
              time,
              count
            }
          }
        }
      }
    `,
    {
      // timeFrom: new Date(Date.now() - (24 * 1000 * 60 * 60)).toISOString().split('T')[0]
    }
  )
  const dashboardData: DashboardData[] = response.locations
    .filter(loc => loc.clientCount.timespan.length > 0)
    .map(loc => ({
      id: loc.id,
      clients: {
        current: 0,
        uniqueToday: 0,
        uniqueYesterday: Math.max(...loc.clientCount.timespan.map(hour => hour.count)), // TODO: Not unique! Needs it's own query
        trend: loc.clientCount.timespan.map(hour => hour.count ?? 0)
      }
    }))
  return dashboardData
}
