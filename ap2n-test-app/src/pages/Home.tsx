import { Button, Card, CardContent, Grid } from "@mui/material"
import { FC } from "react"

export const Home: FC = () => {
    return (
        <>
            <h2>Choose role</h2>
            <Grid container>

                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Button fullWidth color="primary">
                                操作者
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Button fullWidth color="primary">
                                アップローダー
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}