export interface OfferModel {
    /**
     * offer:トラックのコーディック情報などを送る
     * answer:自身のコーディック情報
     * candidate:通信経路情報
     */
    type: "offer" | "answer" | "candidate",
    sender: string,
    sessionDescription: any,

    candidate: any,
}