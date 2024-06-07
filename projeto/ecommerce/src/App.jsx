import './App.css'
import Routes from "./Routes/Routes"
import { UserProvider } from './context/UsuarioContext'

function App() {
  return (
    <>
    <UserProvider>
      <Routes />
    </UserProvider>
    </>
  )
}

export default App