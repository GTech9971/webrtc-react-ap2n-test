import { doc, DocumentData, DocumentReference, onSnapshot } from "firebase/firestore";
import React from "react";
import FirebaseSignallingClient from "./FirebaseSignallingClient";

export default class ControllerRtcClient {

    private rctPeerConnection: RTCPeerConnection;

    private firebaseSignallingClient: FirebaseSignallingClient;

    public mediaStream: MediaStream | null;


    constructor(public remoteVideoRef: React.RefObject<HTMLVideoElement>,
        public setRtcClient: (rtcClient: ControllerRtcClient) => void,) {

        const config: RTCConfiguration = { iceServers: [{ urls: "stun:stun.stunprotocol.org" }] }
        this.rctPeerConnection = new RTCPeerConnection(config);
        this.mediaStream = null;
        this.firebaseSignallingClient = new FirebaseSignallingClient();
    }



    public async startListening() {
        await this.firebaseSignallingClient.remove("controller");
        console.log('thor');
        const signallingRef: DocumentReference<DocumentData> = doc(this.firebaseSignallingClient.database, "rooms", "controller");
        onSnapshot(signallingRef, async (snapshot) => {
            const data: DocumentData | undefined = snapshot.data();
            console.log(data);
            if (!data) { return; }

            const { candidate, sessionDescription, sender, type } = data;

            switch (type) {
                case "offer":
                    await this.asnwser(sessionDescription);
                    break;
                case "answer":
                    await this.saveReceivedSessionDescription(sessionDescription);
                    break;
                case "candidate":
                    await this.addIceCandidate(candidate);
                    break;
                default:
                    this.setRtcClient(this);
                    break;
            }
        });
    }

    /**
     * Uploaderに接続する
     * icacandidateのコールバックの設定
     * uploaderからのtrack受信時のコールバック設定
     * offerの送信
     * @param uploaderName 
     */
    public async connect() {
        this.setOnicecandidateCallback();
        this.setOnTrack();
        await this.offer();
        this.setRtcClient(this);
    }

    //answer
    private async asnwser(sessionDescription: any) {
        try {
            this.setOnicecandidateCallback();
            this.setOnTrack();
            await this.setRemoteDescription(sessionDescription);
            const answer = await this.rctPeerConnection.createAnswer();
            await this.rctPeerConnection.setLocalDescription(answer);
            await this.firebaseSignallingClient.sendAnswer("controller", "uploader", this.rctPeerConnection.localDescription as RTCSessionDescription);
        } catch (e) {
            throw e;
        }
    }

    private async saveReceivedSessionDescription(sessionDescription: any) {
        try {
            await this.setRemoteDescription(sessionDescription);
        } catch (e) {
            throw e;
        }
    }

    //offer
    private async offer() {
        try {
            const sessionDescription: RTCSessionDescriptionInit = await this.rctPeerConnection.createOffer();
            await this.rctPeerConnection.setLocalDescription(sessionDescription);
            await this.firebaseSignallingClient.sendOffer("controller", "uploader", this.rctPeerConnection.localDescription as RTCSessionDescription);
        } catch (e) {
            throw e;
        }
    }

    //candidate
    private async addIceCandidate(candidate: any) {
        try {
            const iceCandidate = new RTCIceCandidate(candidate);
            await this.rctPeerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
            throw e;
        }
    }

    private setOnicecandidateCallback() {
        this.rctPeerConnection.onicecandidate = (async (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                await this.firebaseSignallingClient.sendCandidate("controller", "uploader", event.candidate.toJSON());
            }
        });
    }

    //共通

    private setOnTrack() {
        this.rctPeerConnection.ontrack = (rtcTrackEvent: RTCTrackEvent) => {
            if (rtcTrackEvent.track.kind !== "video") { return; }

            const remoteMediaStream: MediaStream = rtcTrackEvent.streams[0];
            this.remoteVideoRef.current!.srcObject = remoteMediaStream;
            this.setRtcClient(this);
        }
        this.setRtcClient(this);
    }


    private async setRemoteDescription(sessionDescription: any) {
        await this.rctPeerConnection.setRemoteDescription(sessionDescription);
    }


}