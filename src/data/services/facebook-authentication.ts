import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApiInterface } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'

export class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUser: LoadFacebookUserApiInterface) {}

  async performAuth (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUser.loadUser(params)

    return new AuthenticationError('invalid credentials')
  }
}
