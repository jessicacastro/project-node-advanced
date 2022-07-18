import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUser: LoadFacebookUserApiInterface) {}

  async performAuth (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUser.loadUser(params)

    return new AuthenticationError('invalid credentials')
  }
}

interface LoadFacebookUserApiInterface {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

class LoadFacebookUserSpy implements LoadFacebookUserApiInterface {
  accessToken?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.accessToken = params.accessToken

    return this.result
  }
}

namespace LoadFacebookUserApi {
  export type Params = {
    accessToken?: string
  }

  export type Result = undefined
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUser)
    await sut.performAuth({ accessToken: 'any_token' })

    expect(loadFacebookUser.accessToken).toBe('any_token')
  })

  it('should throw an AuthenticationError if LoadFacebookUserAPI returns undefined', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    loadFacebookUser.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    const authResult = await sut.performAuth({ accessToken: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError('invalid credentials'))
  })
})
