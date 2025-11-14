import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import Navbar from "./components/Navbar"
import LoadingSpinner from "./components/LoadingSpinner"
import useCheckToken from './hooks/useCheckToken'

export default function App() {
  useCheckToken()
  const checkTokenLoading = useSelector(state => state.user.checkTokenLoading)

  if (checkTokenLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  )
}