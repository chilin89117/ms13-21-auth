import {useContext} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthContext from './store/auth-context'
import Layout from './components/Layout/Layout'
import UserProfile from './components/Profile/UserProfile'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          {!authCtx.isSignedIn ? <AuthPage /> : <Redirect to='/' />}
        </Route>
        <Route path='/profile'>
          {authCtx.isSignedIn ? <UserProfile /> : <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
