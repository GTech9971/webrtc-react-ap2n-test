import { useEffect, useReducer, useRef, useState } from "react";
import ControllerRtcClient from "../utils/ControllerRtcClient";

export const useControllerRtcClient = () => {
    const [rtcClient, _setRtcClient] = useState<ControllerRtcClient>();
    const remoteVideoRef = useRef(null);
    const secondVideoRef = useRef(null);
    const [, forceRender] = useReducer(flg => !flg, false);

    // クラスの更新をデフォルトのsetStateで行なっても際レンダリングされないので、
    // forceRenderを発火させて強制的にレンダリングさせている
    const setRtcClient = (rtcClient: ControllerRtcClient) => {
        _setRtcClient(rtcClient);
        forceRender();
    }

    useEffect(() => {
        const init = async () => {
            const client: ControllerRtcClient = new ControllerRtcClient(remoteVideoRef, secondVideoRef, setRtcClient);
            client.setRtcClient(client);
        }
        init();
    }, []);


    return rtcClient;
}