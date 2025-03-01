import { useParams, useSearchParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

export default function Room() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const username = searchParams.get('username') || 'Anonymous'
  const isHost = searchParams.get('host') === 'true'
// no real example sets here; 
  const myMeeting = async (element) => {
    const appID = 1109156548
    const serverSecret = "dbb745f23322ab098daaad68b3b7e684"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      username
    )

    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
        config: {
          role: isHost ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience,
        },
      },
      showPreJoinView: true,
      showScreenSharingButton: true,
      showUserList: true,
      showRoomDetailsButton: true,
    })
  }

  return (
    <div className="room-container">
      <div className="video-container" ref={myMeeting}></div>
    </div>
  )
}