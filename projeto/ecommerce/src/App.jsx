import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ProdutoProvider } from './context/ProdutosContext'
import Produto from './components/Produto/Produto'

function App() {

  return (
    <>
    <ProdutoProvider>
      <Produto/>
    </ProdutoProvider>
    </>
  )
}

export default App
