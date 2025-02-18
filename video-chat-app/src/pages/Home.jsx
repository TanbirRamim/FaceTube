import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleJoin = () => {
    if (roomId && username) {
      navigate(`/room/${roomId}?username=${encodeURIComponent(username)}`)
    }
  }

  return (
    <div className="home-container">
      <div className="form-container">
        <div className="logo-section">
          <img 
            src="/images/facetube-logo.png" 
            alt="FaceTube Logo" 
            className="app-logo" 
          />
          <h1>FaceTube</h1>
          <p className="tagline">Connect with anyone, anywhere</p>
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
          <button 
            onClick={handleJoin} 
            disabled={!roomId || !username}
            className="join-button"
          >
            Join Room
          </button>
        </div>
        <p className="creator-credit">A project by Tanbir Hossain Ramim</p>
      </div>
    </div>
  )
}