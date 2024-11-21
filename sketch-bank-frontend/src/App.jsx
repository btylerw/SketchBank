import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { LoginPage } from './LoginPage'
import AuthProvider from './AuthProvider.jsx'
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
