import { useEffect, useReducer, useRef, useState } from "react";
import UploaderRtcClient from "../utils/UploaderRtcClient";


export const useUploaderRtcClient = () => {
    const [rtcClient, _setRtcClient] = useState<UploaderRtcClient>();
    const [, forceRender] = useReducer(flg => !flg, false);

    // クラスの更新をデフォルトのsetStateで行なっても際レンダリングされないので、
    // forceRenderを発火させて強制的にレンダリングさせている
    const setRtcClient = (rtcClient: UploaderRtcClient) => {
        _setRtcClient(rtcClient);
        forceRender();
    }

    useEffect(() => {
        const init = async () => {
            const client: UploaderRtcClient = new UploaderRtcClient(setRtcClient);
            await client.setMediaStream();
        }
        init();
    }, []);


    return rtcClient;
} 