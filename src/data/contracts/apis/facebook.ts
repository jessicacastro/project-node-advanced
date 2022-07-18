export interface LoadFacebookUserApiInterface {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    accessToken?: string
  }

  export type Result = undefined
}
