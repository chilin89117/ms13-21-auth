import {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import styles from './MainNavigation.module.css'

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)

  const signOutHandler = () => authCtx.signOut()

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isSignedIn && (
            <li>
              <Link to='/auth'>Sign In</Link>
            </li>
          )}
          {authCtx.isSignedIn && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button type='button' onClick={signOutHandler}>Sign Out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
