import { Encryption } from "../../../helper/encryption";

export class Coupen {
    private _couponNo: string;
    private _pinCode: string;

    constructor(couponNo: string, pinCode: string) {
        this._couponNo = couponNo;
        this._pinCode = pinCode;
    }

    get couponNo(): string {
        return this._couponNo;
    }

    set couponNo(value: string) {
        this._couponNo = value;
    }

    get pinCode(): string {
        return this._pinCode;
    }

    set pinCode(value: string) {
        this._pinCode = value;
    }

    public toJSON(): JSON {
        return {
            couponNo: this._couponNo,
            pinCode: Encryption.getEncryptionCode(this._pinCode),
        } as any as JSON
    }
}
