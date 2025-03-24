import { Encryption } from '../../../helper/encryption';

export class AccessCode {
  private _cardNo: string | null;
  private _picCode: string;
  private _amount: string;
  private _transType: number;
  private _accessCode: string;

  constructor(cardNo: string | null, picCode: string, amount: string, transType: number, accessCode: string) {
    this._cardNo = cardNo;
    this._picCode = picCode;
    this._amount = amount;
    this._transType = transType;
    this._accessCode = accessCode;
  }

  public get cardNo(): string | null {
    return this._cardNo;
  }
  public set cardNo(value: string | null) {
    this._cardNo = value;
  }

  public get picCode(): string {
    return this._picCode;
  }
  public set picCode(value: string) {
    this._picCode = value;
  }

  public get amount(): string {
    return this._amount;
  }
  public set amount(value: string) {
    this._amount = value;
  }

  public get transType(): number {
    return this._transType;
  }
  public set transType(value: number) {
    this._transType = value;
  }

  public get accessCode(): string | null {
    return this._accessCode;
  }
  public set accessCode(value: string) {
    this._accessCode = value;
  }

  public toJSON(): JSON {
    return {
      cardNo: this._cardNo,
      picCode: Encryption.getEncryptionCode(this._picCode),
      amount: this._amount,
      transType: this._transType,
      accessCode: this._accessCode
    } as any as JSON
  }
}
  