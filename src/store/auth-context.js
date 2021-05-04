import {createContext, useCallback, useEffect, useState} from 'react'

let signOutTimer    // for clearing setTimeout()

const AuthContext = createContext({
  idToken: '',
  isSignedIn: false,
  signIn: token => {},
  signOut: () => {}
})

// get token from localStorage and see if it is still valid
const getTokenFromStorage = () => {
  const storedToken = localStorage.getItem('ms1322-token')
  const storedExpTime = localStorage.getItem('ms1322-exp')
  let expirationTime
  if (storedExpTime) expirationTime = parseInt(storedExpTime)
  else expirationTime = 0
  const remainingDuration = expirationTime - new Date().getTime()
  // if less than 10 seconds remains clear localStorage
  if (remainingDuration <= 10000) {
    localStorage.removeItem('ms1322-token')
    localStorage.removeItem('ms1322-exp')
    return {storedToken: null, remainingDuration: 0}
  }
  return {storedToken, remainingDuration}
}

export const AuthContextProvider = ({children}) => {
  const {storedToken, remainingDuration} = getTokenFromStorage()
  const [idToken, setIdToken] = useState(storedToken)
  const isSignedIn = !!idToken

  // use useCallback because of dependency in useEffect
  const signOutHandler = useCallback(() => {
    setIdToken(null)
    localStorage.removeItem('ms1322-token')
    localStorage.removeItem('ms1322-exp')
    if (signOutTimer) clearTimeout(signOutTimer)
  }, [])

  const signInHandler = (token, expirationTime) => {
    setIdToken(token)
    localStorage.setItem('ms1322-token', token)
    localStorage.setItem('ms1322-exp', expirationTime.toString())
    const remainingDuration = expirationTime - new Date().getTime()
    // sign out automatically 10 seconds before token expires
    signOutTimer = setTimeout(signOutHandler, remainingDuration - 10000)
  }

  // when user refreshes and gets stored token, sign out automatically with remaining time
  useEffect(() => {
    if (remainingDuration > 10000) signOutTimer = setTimeout(signOutHandler, remainingDuration)
    else signOutHandler()
  }, [storedToken, signOutHandler])

  const contextValue = {
    idToken, isSignedIn, signIn: signInHandler, signOut: signOutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
