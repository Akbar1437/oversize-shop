export type ProtectedRouteProps = {
  isAuthenticated: boolean
  isAdmin: boolean
  authenticationPath: string
  outlet: JSX.Element
}
