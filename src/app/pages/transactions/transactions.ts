
export class Transactions {
  private _transId: number;
  private _cardNo: string;
  private _amount: string;
  private _purchaseTransStatus: string;
  private _approvedRejectedDateTime: string;
  private _charityNo: number;

  constructor(transId: number, cardNo: string, amount: string, purchaseTransStatus: string, approvedRejectedDateTime: string, charityNo: number) {
    this._transId = transId;
    this._cardNo = cardNo;
    this._amount = amount;
    this._purchaseTransStatus = purchaseTransStatus;
    this._approvedRejectedDateTime = approvedRejectedDateTime;
    this._charityNo = charityNo;
  }

  get transId(): number {
    return this._transId;
  }

  set transId(value: number) {
    this._transId = value;
  }

  get cardNo(): string {
    return this._cardNo;
  }

  set cardNo(value: string) {
    this._cardNo = value;
  }

  get amount(): string {
    return this._amount;
  }

  set amount(value: string) {
    this._amount = value;
  }

  get purchaseTransStatus(): string {
    return this._purchaseTransStatus;
  }

  set purchaseTransStatus(value: string) {
    this._purchaseTransStatus = value;
  }

  get approvedRejectedDateTime(): string {
    return this._approvedRejectedDateTime;
  }

  set approvedRejectedDateTime(value: string) {
    this._approvedRejectedDateTime = value;
  }

  get charityNo(): number {
    return this._charityNo;
  }

  set charityNo(value: number) {
    this._charityNo = value;
  }
  
  public static fromJSON(response: any): Transactions {
      return new Transactions(
          response.transId,
          response.cardNo,
          response.amount,
          response.purchaseTransStatus,
          response.approvedRejectedDateTime,
          response.charityNo,
      );
  }
}
