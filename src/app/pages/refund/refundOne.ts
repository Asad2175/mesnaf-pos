import { ExpiryHMSFormat } from "../../helper/expiry-hms.interface";

export class RefundOne {
  private _transId: number;
  private _amount: string;
  private _mobile: string;
  private _expiryHMSFormat: ExpiryHMSFormat;

  constructor(transId: number, amount: string, mobile: string, expiryHMSFormat: ExpiryHMSFormat) {
    this._transId = transId;
    this._amount = amount;
    this._mobile = mobile;
    this._expiryHMSFormat = expiryHMSFormat;
  }

  get transId(): number {
    return this._transId;
  }

  get amount(): string {
    return this._amount;
  }

  get mobile(): string {
    return this._mobile;
  }

  get expiryHMSFormat(): ExpiryHMSFormat {
    return this._expiryHMSFormat;
  }

  set amount(value: string) {
    this._amount = value;
  }

  set mobile(value: string) {
    this._mobile = value;
  }

  set expiryHMSFormat(value: ExpiryHMSFormat) {
    this._expiryHMSFormat = value;
  }

  public static fromJSON(response: any): RefundOne {
    return new RefundOne(
        response.purchaseTransDTO.transId,
        response.purchaseTransDTO.amount.toFixed(2),
        response.smsOTPResponseDTO.mobile,
        response.smsOTPResponseDTO.expiryHMSFormat
    );
}
}
