import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { Dispatch, RefObject, SetStateAction, } from "react"
//import "./SecondVideo.scss";
import { VideoRemote } from "./VideoRemote";

export interface SecondVideoProps {
    /** アップローダーからの画像表示用 */
    videoRef: RefObject<HTMLVideoElement>,
    /** 表示、非表示 */
    isShow: boolean,
    setShow: Dispatch<SetStateAction<number>>,
}
export const SecondVideo = (props: SecondVideoProps) => {
    return (
        <>
            <IonHeader hidden={props.isShow === false}>
                <IonToolbar>

                    <IonTitle>Second Video</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="controller-container" hidden={props.isShow === false}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="8">
                            <VideoRemote videoRef={props.videoRef} />
                        </IonCol>
                        <IonCol size="4">
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}