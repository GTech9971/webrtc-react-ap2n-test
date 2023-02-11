import ControllerRtcClient from "../utils/ControllerRtcClient";

export const VideoRemote = (props: { controllerRtcClient: ControllerRtcClient }) => {
    const { controllerRtcClient } = props;
    const videoRef = controllerRtcClient.remoteVideoRef;

    return (
        <video autoPlay muted ref={videoRef} />
    )
}