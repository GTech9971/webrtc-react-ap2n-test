import { doc, DocumentData, DocumentReference, onSnapshot } from "firebase/firestore";
import FirebaseSignallingClient from "./FirebaseSignallingClient";

export default class UploaderRtcClient {

    private rctPeerConnection: RTCPeerConnection;

    private firebaseSignallingClient: FirebaseSignallingClient;

    public mediaStream: MediaStream | null;

    constructor(public setRtcClient: (rtcClient: UploaderRtcClient) => void,) {

        //public stun server
        const config: RTCConfiguration = { iceServers: [{ urls: "stun:stun.stunprotocol.org" }] }
        this.rctPeerConnection = new RTCPeerConnection(config);
        this.mediaStream = null;
        this.firebaseSignallingClient = new FirebaseSignallingClient();
    }


    /**
     * MediaStreamの初期化と、音声・ビデオトラックをrtcに設定する
     */
    public async setMediaStream() {
        const constrantraits: MediaStreamConstraints = { audio: true, video: true };
        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia(constrantraits);
            const audioTrack = this.mediaStream!.getAudioTracks()[0];
            const videoTrack = this.mediaStream.getVideoTracks()[0];
            this.rctPeerConnection.addTrack(audioTrack, this.mediaStream);
            this.rctPeerConnection.addTrack(videoTrack, this.mediaStream);
        } catch (e) {
            throw e
        }
        this.setRtcClient(this);
    }

    private async saveReceivedSessionDescription(sessionDescription: any) {
        try {
            await this.setRemoteDescription(sessionDescription);
        } catch (e) {
            throw e;
        }
    }

    public async startListening() {
        await this.firebaseSignallingClient.remove("uploader");

        const signallingRef: DocumentReference<DocumentData> = doc(this.firebaseSignallingClient.database, "rooms", "uploader");
        onSnapshot(signallingRef, async (snapshot) => {
            const data: DocumentData | undefined = snapshot.data();
            console.log(data);
            if (!data) { return; }

            const { candidate, sessionDescription, sender, type } = data;

            switch (type) {
                case "offer":
                    await this.asnwser(sender, sessionDescription);
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
     * Roomに接続する
     * icecandidateの通信コールバックの設定
     * offerの送信
     */
    public async connect() {
        this.setOnicecandidateCallback();
        await this.offer();
        this.setRtcClient(this);
    }


    //answer
    private async asnwser(sender: string, sessionDescription: any) {
        try {
            this.setOnicecandidateCallback();
            //this.setOnTrack();
            await this.setRemoteDescription(sessionDescription);
            const answer = await this.rctPeerConnection.createAnswer();
            await this.rctPeerConnection.setLocalDescription(answer);
            await this.firebaseSignallingClient.sendAnswer("uploader", "controller", this.rctPeerConnection.localDescription as RTCSessionDescription);
        } catch (e) {
            throw e;
        }
    }


    //offer

    private async offer() {
        try {
            const sessionDescription: RTCSessionDescriptionInit = await this.rctPeerConnection.createOffer();
            await this.rctPeerConnection.setLocalDescription(sessionDescription);
            await this.firebaseSignallingClient.sendOffer("uploader", "controller", this.rctPeerConnection.localDescription as RTCSessionDescription);
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

    //共通

    private setOnicecandidateCallback() {
        this.rctPeerConnection.onicecandidate = (async (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                await this.firebaseSignallingClient.sendCandidate("uploader", "controller", event.candidate.toJSON());
            }
        });
    }

    //uploaderは接続先のトラックの受信は不要なのでコメントアウト
    // private setOnTrack() {
    //     this.rctPeerConnection.ontrack = (rtcTrackEvent: RTCTrackEvent) => {
    //         if (rtcTrackEvent.track.kind !== "video") { return; }

    //         const remoteMediaStream: MediaStream = rtcTrackEvent.streams[0];
    //         this.remoteVideoRef.current!.srcObject = remoteMediaStream;
    //         this.setRtcClient(this);
    //     }
    //     this.setRtcClient(this);
    // }


    private async setRemoteDescription(sessionDescription: any) {
        await this.rctPeerConnection.setRemoteDescription(sessionDescription);
    }

}