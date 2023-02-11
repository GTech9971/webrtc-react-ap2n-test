import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useCallback } from "react"
import { VideoRemote } from "../components/VideoRemote";
import { useControllerRtcClient } from "../hooks/useControllerRtcClient"
import ControllerRtcClient from "../utils/ControllerRtcClient"

export const Controller: FC = () => {

    const controllerRtcClient: ControllerRtcClient = useControllerRtcClient() as ControllerRtcClient;

    /**
     * Roomを開く
     */
    const openRoom = useCallback(async (e: any) => {
        await controllerRtcClient.startListening();
        //  await controllerRtcClient.connect();
        e.preventDefault();
    }, [controllerRtcClient]);

    if (!controllerRtcClient) { return <></> }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Controller</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonButton onClick={async e => { await openRoom(e) }}>開始</IonButton>
                    </IonRow>
                    <IonRow>
                        <VideoRemote controllerRtcClient={controllerRtcClient} />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}