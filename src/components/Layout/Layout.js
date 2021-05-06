import MainNavigation from './MainNavigation'

const Layout = ({children}) => (
  <>
    <MainNavigation />
    <main>{children}</main>
  </>
)

export default Layout
