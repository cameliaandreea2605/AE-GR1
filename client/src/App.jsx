import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'sonner'
import Navbar from "./components/Navbar"
import LoadingSpinner from "./components/LoadingSpinner"
import useCheckToken from './hooks/useCheckToken'
import { useEffect } from 'react'

export default function App() {
  const navigate = useNavigate();
  useCheckToken()
  const loggedIn = useSelector(state => state.user.loggedIn)
  const checkTokenLoading = useSelector(state => state.user.checkTokenLoading)

  useEffect(() => {
    if (!loggedIn && !checkTokenLoading) {
      navigate('/');
    }
  }, [loggedIn, checkTokenLoading, navigate]);

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