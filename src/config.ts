export const config = {
  metaData: {
    appName: env('VUE_APP_APP_NAME', 'Byggbelastning'),
    productOwner: env('VUE_APP_PRODUCT_OWNER', 'Vestfold og Telemark Fylkeskommune'),
    repositoryUrl: env('VUE_APP_REPOSITORY_URL', 'https://github.com/vtfk/byggbelastning-frontend')
  },
  apiUrl: env('API_URL', 'http://localhost:4000/graphql')
}

function env (env: string, defaultValue?: string): string {
  const value = process.env[env]
  if (typeof value === 'string') return value
  if (typeof defaultValue === 'string') return defaultValue
  throw Error(`Missing required environment variable "${env}"!`)
}
