import { useParams, useSearchParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function Room() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const username = searchParams.get('username') || 'Anonymous'

  const myMeeting = async (element) => {
    const appID = 1109156548;
    const serverSecret = "dbb745f23322ab098daaad68b3b7e684";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 4,
      layout: "Grid",
      showLayoutButton: true,
      scenario: {
        mode: "GroupCall",
        config: {
          role: "Host",
        },
      },
      showLeavingView: true,
      showRoomDetailsButton: true,
      showPreJoinView: true,
      preJoinViewConfig: {
        title: "Join FaceTube Room",
      },
      branding: {
        logoURL: "https://your-logo-url.png",
      },
    });
  };

  return (
    <div className="myCallContainer" ref={myMeeting}></div>
  );
}

export default Room