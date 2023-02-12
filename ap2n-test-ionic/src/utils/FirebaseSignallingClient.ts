import { initializeApp } from "firebase/app";
import { doc, DocumentData, DocumentReference, Firestore, getFirestore, setDoc } from 'firebase/firestore';
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


    public readonly database: Firestore;

    targetRef(senderName: string): DocumentReference<DocumentData> { return doc(this.database, 'rooms', senderName); }

    constructor() {
        const firebase = initializeApp(firebaseConfig);
        this.database = getFirestore(firebase);
    }

    /**
     * offer情報をシグナリングサーバーに記録する
     * @param sessionDescription 
     */
    public async sendOffer(localPeerName: string, remotePeerName: string, sessionDescription: RTCSessionDescription) {
        const offerModel: OfferModel = {
            type: "offer",
            sender: localPeerName,
            sessionDescription: sessionDescription.toJSON(),
            candidate: null,
        };

        await setDoc(this.targetRef(remotePeerName), offerModel, { merge: true });
    }

    public async sendAnswer(localPeerName: string, remotePeerName: string, sessionDescription: RTCSessionDescription) {
        const offerModel: OfferModel = {
            type: "answer",
            sender: localPeerName,
            sessionDescription: sessionDescription.toJSON(),
            candidate: null,
        };

        await setDoc(this.targetRef(remotePeerName), offerModel, { merge: true });
    }

    public async sendCandidate(localPeerName: string, remotePeerName: string, candidate: RTCIceCandidateInit) {
        const candidateModel: OfferModel = {
            type: "candidate",
            sender: localPeerName,
            candidate: candidate,
            sessionDescription: null,
        };
        await setDoc(this.targetRef(remotePeerName), candidateModel, { merge: true });
    }

    public async remove(localPeerName: string) {
        await setDoc(doc(this.database, 'rooms', localPeerName), {});
    }
}