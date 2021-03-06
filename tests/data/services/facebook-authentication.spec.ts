import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApiInterface, LoadFacebookUserApi } from '@/data/contracts/apis'

class LoadFacebookUserSpy implements LoadFacebookUserApiInterface {
  accessToken?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.accessToken = params.accessToken

    return this.result
  }
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
