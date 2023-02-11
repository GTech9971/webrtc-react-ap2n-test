import { useEffect, useRef } from "react";
import UploaderRtcClient from "../utils/UploaderRtcClient";

/**
 * uploader側で表示するvideo領域
 * @param props 
 * @returns 
 */
export const VideoLocal = (props: { uploaderRtcClient: UploaderRtcClient }) => {
    const { uploaderRtcClient } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        try {
            videoRef.current!.srcObject = uploaderRtcClient.mediaStream;
        } catch (e) {
            throw e;
        }
    }, [videoRef, uploaderRtcClient?.mediaStream]);

    return (
        <div>
            <video ref={videoRef} autoPlay muted></video>
        </div>
    )
}