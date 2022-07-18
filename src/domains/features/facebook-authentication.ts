import { AccessToken } from '@/domains/models'
import { AuthenticationError } from '@/domains/errors'

export interface FacebookAuthentication {
  performAuth: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
  export type Params = {
    accessToken: string
  }

  export type Result = AccessToken | AuthenticationError
}
