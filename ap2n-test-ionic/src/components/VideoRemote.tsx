import { RefObject } from "react";

export const VideoRemote = (props: { videoRef: RefObject<HTMLVideoElement> }) => {
    return (
        <video autoPlay muted ref={props.videoRef} />
    )
}