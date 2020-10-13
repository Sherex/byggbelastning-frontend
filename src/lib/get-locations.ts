import { request, gql } from 'graphql-request'

interface LocationsResponse {
  locations: Array<{
    name: string
    type: {
      code: string
      name: string
    }
    buildings: Array<{
      name: string
      floors: Array<{
        name: string
      }>
    }>
  }>
}

export interface Location {
  name: string
  type: {
    code: string
    name: string
  }
  buildings: Array<{
    name: string
    floors: Array<{
      name: string
    }>
  }>
}

export async function getLocations (): Promise<Location[]> {
  // TODO: Get Url from config
  const response = await request<LocationsResponse>('http://localhost:4000/graphql',
    gql`
      query getLocations {
        locations {
          name
          type {
            code
            name
          }
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
  return response.locations
}
