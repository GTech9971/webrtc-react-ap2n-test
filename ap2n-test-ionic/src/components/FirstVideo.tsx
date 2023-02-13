import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./FirstVideo.scss";
import { VideoRemote } from "./VideoRemote";

export interface FirstVideoProps {
    /** アップローダーからの画像表示用 */
    videoRef: RefObject<HTMLVideoElement>,
    /** 表示非表示 */
    isShow: boolean,
    setShow: Dispatch<SetStateAction<number>>,
}


export const FirstVideo = (props: FirstVideoProps) => {
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const calibratonReportCanvasRef = useRef<HTMLCanvasElement | null>(null);

    // 枠線描画用
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [drawCtx, setDrawCtx] = useState<CanvasRenderingContext2D>();


    /** 枠線描画用のcanvasの設定*/
    useEffect(() => {
        if (!props.videoRef.current || !drawCanvasRef.current) { return; }

        const w = props.videoRef.current.offsetWidth;
        const h = props.videoRef.current.offsetHeight;

        //枠線用のキャンバスのサイズを設定
        drawCanvasRef.current.width = w;
        drawCanvasRef.current.height = h;
        const drawCtx: CanvasRenderingContext2D = drawCanvasRef.current.getContext("2d")!;
        drawCtx.strokeStyle = 'red';
        drawCtx.lineWidth = 1;
        setDrawCtx(drawCtx);

    }, [drawCanvasRef, props.videoRef, props.isShow, setDrawCtx]);




    return (
        <>
            <IonHeader hidden={props.isShow === false}>
                <IonToolbar>
                    <IonTitle>
                        First Video
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="calibration-manual" hidden={props.isShow === false}>
                <IonGrid>
                    <IonRow className="video-box">
                        <IonCol>
                            <VideoRemote videoRef={props.videoRef} />
                            <canvas className="draw-canvas" ref={drawCanvasRef} />
                            {/* 結果出力用 */}
                            <canvas ref={resultCanvasRef} hidden />
                            {/* キャリブレーションレポート出力用 */}
                            <canvas ref={calibratonReportCanvasRef} hidden />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonButton onClick={() => { props.setShow(2) }}>Next</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton>AA</IonFabButton>
            </IonFab>

        </>
    )
}