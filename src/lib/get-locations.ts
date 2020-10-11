import { request, gql } from 'graphql-request'

export async function getLocations (): Promise<Location[]> {
  // TODO: Get Url from config
  const response = await request<LocationsResponse>('http://localhost:4000/graphql',
    gql`
      query getLocations {
        locations {
          name
          buildings {
            name
            floors {
              name
            }
          }
        }
      }
    `
  )
  console.log(response.locations[0].buildings.reduce((p, b) => p + b.floors.length, 0))
  return response.locations
}

interface LocationsResponse {
  locations: Array<{
    name: string;
    buildings: Array<{
      name: string;
      floors: Array<{
        name: string;
      }>;
    }>;
  }>;
}

export interface Location {
  name: string;
  buildings: Array<{
    name: string;
    floors: Array<{
      name: string;
    }>;
  }>;
}
