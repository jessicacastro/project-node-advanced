# Facebook Authentication

## Data

* Access Token

### Primary Flow

1. Get data (name, email, and, facebook ID) from Facebook API.
2. Check if user exists with the received email from API.
3. Create an account for the user with the data received from facebook API.
4. Create an access token, from the user id, with thirty minutes expiration.
5. Return the generated access token.

### Alternative Flow

3.Update the user account with the data received from facebook (facebook id and name)
  3.1.Only updates the name in case of the user didn't have

### Exception Flow: Invalid or expirated token

1. Return an authentication error.
