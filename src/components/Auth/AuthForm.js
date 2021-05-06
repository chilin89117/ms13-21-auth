import {useContext, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import styles from './AuthForm.module.css'

const AuthForm = () => {
  const authCtx = useContext(AuthContext)
  const [signInMode, setSignInMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()

  const switchAuthModeHandler = () => setSignInMode(prevState => !prevState)

  const submitHandler = async event => {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if (!email || !email.includes('@') || !password || password.trim().length < 6) {
      alert('Please enter valid email and password of 6 characters or more.')
      return
    }
    setIsLoading(true)
    let endpoint = process.env.REACT_APP_SIGNIN     // default signInMode is true
    if (!signInMode) endpoint = process.env.REACT_APP_SIGNUP

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({email, password, returnSecureToken: true}),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    setIsLoading(false)
    // idToken is returned for both sign up and sign in, unless there is an error
    if (data.idToken) {
      // e.g. {email: "...", expiresIn: "3600", idToken: "...", kind: "...", localId: "...", refreshToken: "..."}
      const expirationTime = new Date().getTime() + parseInt(data.expiresIn) * 1000
      authCtx.signIn(data.idToken, expirationTime)
      console.log(`[AUTH]: Success! Token expires at ${new Date(expirationTime).toLocaleString('en-US')}`)
      history.replace('/')
    } else {
      // e.g. {code: 400, message: "EMAIL_EXISTS", errors: [{domain: "global", message: "EMAIL_EXISTS", reason: "invalid"}]}
      if (data && data.error && data.error.message) alert(data.error.message)
      else alert('Authentication failed.')
      console.error(`[AUTH]: ${data.error.message}`)
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{signInMode ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={styles.actions}>
          {isLoading
            ? <h4 className={styles.loading}>Sending request...</h4>
            : <button type='submit'>{signInMode ? 'Sign In' : 'Create Account'}</button>
          }
          <button type='button' className={styles.toggle} onClick={switchAuthModeHandler}>
            {signInMode ? 'Create new account' : 'Sign in with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
