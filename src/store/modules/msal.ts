import { Module } from 'vuex'
import {
  PublicClientApplication,
  Configuration,
  AuthenticationResult,
  AccountInfo,
  RedirectRequest,
  PopupRequest
} from '@azure/msal-browser'

export interface MsalStates {
  login: AuthenticationResult | null
  accounts: AccountInfo[] | null
}

export interface CreateVuexModuleOptions {
  namespaced?: boolean
  msalConfig: Configuration
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function vuexCreateMsalModule<S = any> (options: CreateVuexModuleOptions): Module<MsalStates, S> {
  const msalInstance = new PublicClientApplication(options.msalConfig)
  return {
    namespaced: options.namespaced,
    state: {
      login: null,
      accounts: null
    },
    mutations: {
      setLogin: (states, payload: AuthenticationResult | null) => {
        states.login = payload
      }
    },
    getters: {
      getLogin: (states) => {
        return states.login
      }
    },
    actions: {
      loginPopup: async (context, options?: PopupRequest) => {
        console.log('POPUP')
        const login = await msalInstance.loginPopup(options)
        context.commit('setLogin', login)
      },
      loginRedirect: async (context, options?: RedirectRequest) => {
        console.log('START')
        Promise.resolve(msalInstance.loginRedirect(options))
      },
      handleRedirect: async (context, hash: string) => {
        const login = await msalInstance.handleRedirectPromise(hash)
        if (login !== null) {
          console.log('Logged in!!')
          console.log(login.account.name)
        }
        context.commit('setLogin', login)
      }
    }
  }
}

export interface installVuexModuleOptions {
  namespaced?: boolean
  msalConfig: Configuration
  path?: string
}
