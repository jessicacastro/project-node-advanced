export class AuthenticationError extends Error {
  constructor (message: string) {
    super(`AuthenticationError:  ${message}`)
    this.name = 'AuthenticationError'
  }
}
