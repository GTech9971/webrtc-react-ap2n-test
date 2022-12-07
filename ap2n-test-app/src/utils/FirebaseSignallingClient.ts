import { initializeApp } from "firebase/app";
import { getDatabase, Database, set, ref, DatabaseReference, remove, } from "firebase/database";
import { OfferModel } from "../models/Offer.model";


const {
    REACT_APP_FIRBASE_API_KEY,
    REACT_APP_FIRBASE_AUTH_DOMAIN,
    REACT_APP_FIRBASE_PROJECT_ID,
    REACT_APP_FIRBASE_STORAGE_BUCKET,
    REACT_APP_FIRBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIRBASE_APP_ID
} = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_FIRBASE_API_KEY,
    authDomain: REACT_APP_FIRBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIRBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIRBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIRBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIRBASE_APP_ID
};

export default class FirebaseSignallingClient {

    public database: Database;

    get targetRef(): DatabaseReference { return ref(this.database, this.RoomName); }

    private _roomName: string = "";
    public get RoomName(): string { return this._roomName; }
    public set RoomName(val: string) { this._roomName = val; }

    constructor() {
        const firebase = initializeApp(firebaseConfig);
        this.database = getDatabase(firebase);
    }

    /**
     * offer情報をシグナリングサーバーに記録する
     * @param sessionDescription 
     */
    public async sendOffer(sessionDescription: RTCSessionDescription) {
        const offerModel: OfferModel = {
            type: "offer",
            sender: "uploader",
            sessionDescription: sessionDescription.toJSON(),
            candidate: null,
        };

        await set(this.targetRef, offerModel);
    }

    public async sendAnswer(senderName: "controller" | "uploader", sessionDescription: RTCSessionDescription) {
        const offerModel: OfferModel = {
            type: "answer",
            sender: senderName,
            sessionDescription: sessionDescription.toJSON(),
            candidate: null,
        };

        await set(this.targetRef, offerModel);
    }

    public async sendCandidate(senderName: "controller" | "uploader", candidate: RTCIceCandidateInit) {
        const candidateModel: OfferModel = {
            type: "candidate",
            sender: senderName,
            candidate: candidate,
            sessionDescription: null,
        };
        await set(this.targetRef, candidateModel);
    }

    public async remove(localPeerName: string) {
        await remove(ref(this.database, localPeerName));
    }
}