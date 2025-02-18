import { useEffect, useRef, useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const VideoChat = () => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')
  const [idToCall, setIdToCall] = useState('')

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  const socket = useRef()

  useEffect(() => {
    socket.current = io('http://localhost:5001')

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream
        }
      })

    socket.current.on('me', (id) => setMe(id))

    socket.current.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.current.emit('answerCall', { signal: data, to: call.from })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.current.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name
      })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.current.on('callAccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
    window.location.reload()
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>My Video</Typography>
            <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%' }} />
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              style={{ marginTop: '20px' }}
            />
            <Typography variant="h6">ID: {me}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>Remote Video</Typography>
            {callAccepted && !callEnded && (
              <video playsInline ref={userVideo} autoPlay style={{ width: '100%' }} />
            )}
            <TextField
              label="ID to Call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              fullWidth
              style={{ marginTop: '20px' }}
            />
            {callAccepted && !callEnded ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={leaveCall}
                fullWidth
                style={{ marginTop: '20px' }}
              >
                End Call
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => callUser(idToCall)}
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Call
              </Button>
            )}
          </Grid>
        </Grid>
        {call.isReceivingCall && !callAccepted && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Typography variant="h6">{call.name} is calling:</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={answerCall}
              style={{ marginLeft: '10px' }}
            >
              Answer
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  )
}

export default VideoChat