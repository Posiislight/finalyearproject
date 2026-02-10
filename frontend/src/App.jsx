import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/')
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <>
      <h1>Frontend + Backend</h1>
      <div className="card">
        <p>
          Message from Django: {message || 'Loading...'}
        </p>
      </div>
    </>
  )
}

export default App
