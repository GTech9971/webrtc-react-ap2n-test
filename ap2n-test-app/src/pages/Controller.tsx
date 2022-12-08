import { Button, Grid } from "@mui/material";
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
        <>
            <h2>Controller</h2>

            <Grid container>
                <Grid justifyContent="center" item xs={12}>
                    <Button fullWidth variant="outlined" onClick={async e => { await openRoom(e) }}>
                        開始
                    </Button>
                </Grid>

                <Grid>
                    <VideoRemote controllerRtcClient={controllerRtcClient} />
                </Grid>
            </Grid>
        </>
    )
}