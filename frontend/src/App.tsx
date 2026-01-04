import { useState } from 'react'
import './App.css'

interface AgentResponse {
  response: string
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`)
      }
      
      const data: AgentResponse = await res.json()
      setResponse(data.response)
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>AI Agent Interface</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt for the AI agent..."
            rows={4}
            className="prompt-input"
          />
        </div>
        <button type="submit" disabled={loading || !prompt.trim()} className="submit-btn">
          {loading ? 'Processing...' : 'Send to Agent'}
        </button>
      </form>
      
      {response && (
        <div className="response">
          <h3>Agent Response:</h3>
          <pre className="response-text">{response}</pre>
        </div>
      )}
    </div>
  )
}

export default App
