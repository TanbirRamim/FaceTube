import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')
  const [isCreating, setIsCreating] = useState(true)
  const navigate = useNavigate()

  const handleJoin = () => {
    if (roomId && username) {
      // Pass isCreating flag to determine if user is host
      navigate(`/room/${roomId}?username=${encodeURIComponent(username)}&host=${isCreating}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoin()
    }
  }

  return (
    <div className="home-container">
      <div className="form-container">
        <div className="logo-section">
          <img 
            src="images/facetube-logo.jpeg" 
            alt="FaceTube Logo" 
            className="app-logo" 
          />
          <h1>FaceTube</h1>
          <p className="tagline">Connect with anyone, anywhere</p>
        </div>
        <div className="mode-toggle">
          <button 
            className={`toggle-btn ${isCreating ? 'active' : ''}`}
            onClick={() => setIsCreating(true)}
          >
            Create Room
          </button>
          <button 
            className={`toggle-btn ${!isCreating ? 'active' : ''}`}
            onClick={() => setIsCreating(false)}
          >
            Join Room
          </button>
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            placeholder={isCreating ? "Create Room ID" : "Enter Room ID"}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleJoin} 
            disabled={!roomId || !username}
            className="join-button"
          >
            {isCreating ? 'Create Room' : 'Join Room'}
          </button>
        </div>
        <p className="creator-credit">A project by Tanbir Hossain Ramim</p>
      </div>
    </div>
  )
}