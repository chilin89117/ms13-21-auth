# ms13-react
## Section 22: Adding Authentication to React Apps (Firebase Auth REST API)
<br />

## __1. Sign up with email/password__
* ### Docs: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
* ### Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

## __2. Sign in with email/password__
* ### Docs: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
* ### Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

## __3. Change password__
* ### Docs: https://firebase.google.com/docs/reference/rest/auth#section-change-password
* ### Endpoint: https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]

## __4. `idToken` returned from Google__
```json
{
  "iss": "https://securetoken.google.com/<project_id>",
  "aud": "<project_id>",
  "auth_time": 1600000000,
  "user_id": "<user_id>",
  "sub": "<user_id>",
  "iat": 1600000000,
  "exp": 1600003600,
  "email": "<user_email>",
  "email_verified": false,
  "firebase": {
    "identities": {
      "email": [
        "<user_email>"
      ]
    },
    "sign_in_provider": "password"
  }
}
```

## __5. Authenticate REST requests to Firebase__
* ### Docs: https://firebase.google.com/docs/database/rest/auth
* ### `https://<project_id>-default-rtdb.firebaseio.com/<collection>.json?auth=<idToken>`
* ### Set database read/write rules using `auth.token`
