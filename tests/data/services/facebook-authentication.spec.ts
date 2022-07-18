import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUser: LoadFacebookUserApiInterface) {}

  async performAuth (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUser.loadUser(params)
  }
}

interface LoadFacebookUserApiInterface {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

class LoadFacebookUserSpy implements LoadFacebookUserApiInterface {
  accessToken?: string

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.accessToken = params.accessToken
  }
}

namespace LoadFacebookUserApi {
  export type Params = {
    accessToken?: string
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUser)
    await sut.performAuth({ accessToken: 'any_token' })

    expect(loadFacebookUser.accessToken).toBe('any_token')
  })
})
