import { Button, Grid } from "@mui/material";
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
        <>
            <h2>Uploader</h2>

            <Grid container>
                <Grid justifyContent="center" item xs={12}>
                    <Button fullWidth variant="outlined" onClick={async e => { await connectRoom(e) }}>
                        接続
                    </Button>
                </Grid>

                <Grid>
                    <VideoLocal uploaderRtcClient={uploaderRtcClient} />
                </Grid>
            </Grid>
        </>
    )
}