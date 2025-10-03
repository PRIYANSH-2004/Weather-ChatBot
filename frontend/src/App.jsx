import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ChatWindow from './components/ChatWindow';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log("main app")
  return (
    <div>
      <h1>Hello word</h1>
      <ChatWindow/>
    </div>
  )
}

export default App
