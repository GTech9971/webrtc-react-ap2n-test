import { RefObject } from "react";
import './VideoRemote.scss';

export interface VideoRemoteProps {
    videoRef: RefObject<HTMLVideoElement>,
    hidden?: boolean
}
export const VideoRemote = (props: VideoRemoteProps) => {
    //videoのrefを最初に設定すること。そうしないとautoPlayを設定していたとしても、メディアを再生できませんと言う表示になる。
    return (
        <div className="video-remote-center" hidden={props.hidden}>
            <video ref={props.videoRef} autoPlay muted></video>
        </div>
    )
}