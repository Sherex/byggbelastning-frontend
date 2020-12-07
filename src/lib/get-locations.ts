import { request, gql } from 'graphql-request'
import { config } from '../config'

interface LocationsResponse {
  locations: Array<{
    id: number
    name: string
    type: {
      code: string
      name: string
    }
    buildings: Array<{
      id: number
      name: string
      floors: Array<{
        name: string
      }>
    }>
  }>
}

export interface Location {
  id: number
  name: string
  type: {
    code: string
    name: string
  }
  clients?: {
    current: number
    uniqueToday: number
    uniqueYesterday: number
    trend: number[]
  }
  buildings: Array<{
    id: number
    name: string
    floors: Array<{
      name: string
    }>
  }>
}

export async function getLocations (): Promise<Location[]> {
  const response = await request<LocationsResponse>(config.apiUrl,
    gql`
      query getLocations {
        locations {
          id
          name
          type {
            code
            name
          }
          buildings {
            id
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
