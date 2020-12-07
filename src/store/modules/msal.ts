import { mutationTree, actionTree } from 'typed-vuex'
import {
  PublicClientApplication,
  Configuration,
  AuthenticationResult,
  AccountInfo,
  RedirectRequest,
  PopupRequest,
  InteractionRequiredAuthError
} from '@azure/msal-browser'
import { config } from '../../config'
import router from '../../router'

const msalOptions: Configuration = {
  auth: {
    clientId: config.msal.clientId,
    authority: config.msal.authority,
    redirectUri: '/login'
  }
}

const msalInstance = new PublicClientApplication(msalOptions)

const aadAccountId = window.localStorage.getItem('aadAccountIds')
const account = aadAccountId ? msalInstance.getAccountByLocalId(aadAccountId) ?? undefined : undefined
const loginHint = aadAccountId ? undefined : window.localStorage.getItem('aadUsername') ?? undefined
const silentRequest = aadAccountId || loginHint ? {
  scopes: [
    'openid',
    'profile',
    'email'
  ],
  loginHint,
  account,
  forceRefresh: false
} : undefined

export interface MsalStates {
  login: AuthenticationResult | null
  accounts: AccountInfo[] | null
}

export const state: MsalStates = {
  login: null,
  accounts: null
}

export const mutations = mutationTree(state, {
  setLogin: (states, payload: AuthenticationResult | null) => {
    states.login = payload
    if (payload && window?.localStorage) {
      window.localStorage.setItem('aadAccountId', payload.account.localAccountId)
      window.localStorage.setItem('aadUsername', payload.account.username)
    }
  }
})

export const actions = actionTree({ state, mutations }, {
  loginPopup: async (context, options?: PopupRequest) => {
    const login = await msalInstance.loginPopup(options)
    context.commit('setLogin', login)
  },
  loginRedirect: async (context, options?: RedirectRequest) => {
    await msalInstance.loginRedirect(options)
  },
  handleRedirect: async (context, hash: string) => {
    const login = await msalInstance.handleRedirectPromise(hash)
    if (login !== null) {
      console.log('Logged in!!')
      console.log(login.account.name)
    }
    context.commit('setLogin', login)
  },
  performLogin: async (context, hash?: string) => {
    let login: AuthenticationResult | null = null
    if (hash) {
      login = await msalInstance.handleRedirectPromise(hash)
    } else if (!silentRequest) {
      await msalInstance.loginRedirect(silentRequest)
      return
    } else {
      try {
        login = await msalInstance.ssoSilent(silentRequest)
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          await msalInstance.loginRedirect(silentRequest)
          return
        }
        console.error(error)
      }
    }
    if (login !== null) {
      console.log('Logged in!!')
      console.log(login.account.name)
    }
    context.commit('setLogin', login)
    router.push('/')
  }
})
