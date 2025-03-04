export class VerifyRefund {
    private _purchaseTransId: string;
    private _otp: string;
    private _transAmount: string;
    private _refundAmount: string;

    constructor(purchaseTransId: string, otp: string, transAmount: string, refundAmount: string){
        this._purchaseTransId = purchaseTransId;
        this._otp = otp;
        this._transAmount = transAmount;
        this._refundAmount = refundAmount;
    }

    get purchaseTransId(): string {
        return this._purchaseTransId;
    }

    get otp(): string {
        return this._otp;
    }

    get transAmount(): string {
        return this._transAmount;
    }

    get refundAmount(): string {
        return this._refundAmount;
    }

    set purchaseTransId(value: string) {
        this._purchaseTransId = value;
    }

    set otp(value: string) {
        this._otp = value;
    }

    set transAmount(value: string) {
        this._transAmount = value;
    }

    set refundAmount(value: string) {
        this._refundAmount = value;
    }

    public toJSON(): JSON {
        return {
            purchaseTransId: this._purchaseTransId,
            otp: this._otp,
            transAmount: this._transAmount,
            refundAmount: this._refundAmount,
        } as any as JSON
      }
}
