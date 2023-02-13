import { IonPage, } from "@ionic/react";
import { FC, useCallback, useState } from "react"
import { FirstVideo } from "../components/FirstVideo";
import { InitController } from "../components/InitController";
import { SecondVideo } from "../components/SecondVideo";
import { useControllerRtcClient } from "../hooks/useControllerRtcClient"
import ControllerRtcClient from "../utils/ControllerRtcClient"

export const Controller: FC = () => {
    const [showComp, setShowComp] = useState<number>(0);

    const controllerRtcClient: ControllerRtcClient = useControllerRtcClient() as ControllerRtcClient;

    if (!controllerRtcClient) { return <></> }

    return (
        <IonPage>
            {/* init */}
            <InitController controller={controllerRtcClient} setShow={setShowComp} show={showComp === 0} />
            {/* first ref */}
            <FirstVideo videoRef={controllerRtcClient.remoteVideoRef} isShow={showComp === 1} setShow={setShowComp} />
            {/* second ref */}
            <SecondVideo videoRef={controllerRtcClient.secondRemoteVideRef} isShow={showComp === 2} setShow={setShowComp} />
        </IonPage>
    )
}