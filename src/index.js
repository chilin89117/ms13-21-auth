import {config} from 'dotenv'
config()
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {AuthContextProvider} from './store/auth-context'
import App from './App'
import './index.css'

render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
)
