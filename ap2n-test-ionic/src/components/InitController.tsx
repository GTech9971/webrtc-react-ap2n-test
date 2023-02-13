import { IonButton, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { Dispatch, SetStateAction, useCallback } from "react";
import ControllerRtcClient from "../utils/ControllerRtcClient"

export interface InitControllerProps {
    show: boolean,
    controller: ControllerRtcClient,

    setShow: Dispatch<SetStateAction<number>>,

}
export const InitController = (props: InitControllerProps) => {

    /**
 * Roomを開く
 */
    const openRoom = useCallback(async () => {
        console.log('start')
        await props.controller.startListening();
        props.setShow(1);
    }, [props]);

    return (
        <>
            <IonHeader hidden={props.show === false}>
                <IonToolbar>
                    <IonTitle>Init</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen hidden={props.show === false}>
                <IonGrid>
                    <IonRow>
                        <IonButton onClick={openRoom}>開始</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}