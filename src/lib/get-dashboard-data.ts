import { request, gql } from 'graphql-request'

export async function getDashboardData() {
  // TODO: Get Url from config
  const response = await request<LocationsResponse>('http://localhost:4000/graphql',
    gql`
      query getLocations($timeFrom: String) {
        locations {
          name
          clientCount {
            timespan (from: $timeFrom) {
              time,
              count
            }
          }
        }
      }
    `,
    {
      timeFrom: new Date(Date.now() - (24 * 1000 * 60 * 60)).toISOString().split('T')[0]
    }
  )
  const dashboardData: DashboardData[] = response.locations.map(loc => ({
    name: loc.name,
    clients: {
      current: 0,
      uniqueToday: 0,
      uniqueYesterday: Math.max(...loc.clientCount.timespan.map(ts => ts.count)),
      trend: loc.clientCount.timespan.map(ts => ts.count)
    }
  }))

  return dashboardData
}

interface LocationsResponse {
  locations: Array<{
    name: string;
    clientCount: {
      timespan: Array<{
        time: string;
        count: number;
      }>;
    };
  }>;
}

export interface DashboardData {
  name: string;
  clients: {
    current: number;
    uniqueToday: number;
    uniqueYesterday: number;
    trend: number[];
  };
}
