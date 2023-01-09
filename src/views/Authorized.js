import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ children }) => {
  if (localStorage.getItem("lu_token")) {
    return children
  }
  return <Navigate to='/login' replace />
}
