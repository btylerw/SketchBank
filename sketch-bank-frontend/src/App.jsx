import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthProvider from './AuthProvider'
import { LoginPage } from './LoginPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <LoginPage/>
      </AuthProvider>
    </>
  )
}

export default App
