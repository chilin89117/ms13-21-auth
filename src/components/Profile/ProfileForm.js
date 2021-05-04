import {useContext, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import styles from './ProfileForm.module.css'

const ProfileForm = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()
  const newPwdRef = useRef()

  const submitHandler = async event => {
    event.preventDefault()
    const newPwd = newPwdRef.current.value
    if (newPwd.trim().length < 6) {
      alert('Please enter a password with at least 6 characters')
      return
    }
    const response = await fetch(process.env.REACT_APP_CHGPWD, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.idToken,
        password: newPwd,
        returnSecureToken: true
      }),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    if (data.idToken) {
      authCtx.signIn(data.idToken)
      console.log('[CHG PWD]: Success!')
      history.push('/')
    } else {
      alert(data.error.message)
      console.error(`[CHG PWD]: ${data.error.message}`)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={newPwdRef} />
      </div>
      <div className={styles.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
