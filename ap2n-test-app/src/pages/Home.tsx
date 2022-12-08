import { Button, Card, CardContent, Grid } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"

export const Home: FC = () => {
    return (
        <>
            <h2>Choose role</h2>
            <Grid container>

                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Button fullWidth color="primary">
                                <Link to="controller">操作者</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Button fullWidth color="primary" >
                                <Link to="uploader">アップローダー</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}