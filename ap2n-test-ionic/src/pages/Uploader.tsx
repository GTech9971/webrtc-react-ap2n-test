
import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useCallback } from "react";
import { VideoLocal } from "../components/VideoLocal";
import { useUploaderRtcClient } from "../hooks/useUploaderRtcClient";
import UploaderRtcClient from "../utils/UploaderRtcClient";

export const Uploader: FC = () => {
    const uploaderRtcClient: UploaderRtcClient = useUploaderRtcClient() as UploaderRtcClient;

    /**
     * 接続ボタン押下時にrtcをリッスンし、
     * RoomNameに接続をする
     */
    const connectRoom = useCallback(async (e: any) => {
        await uploaderRtcClient.startListening();
        await uploaderRtcClient.connect();
        e.preventDefault();
    }, [uploaderRtcClient]);


    if (!uploaderRtcClient) { return <></> }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Uploader</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonButton onClick={async e => await connectRoom(e)}>開始</IonButton>
                    </IonRow>

                    <IonRow>
                        <VideoLocal uploaderRtcClient={uploaderRtcClient} />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}