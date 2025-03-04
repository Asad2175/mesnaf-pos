export class Purchase {
  private _amount: number;
  private _status: boolean;
  private _message: string;
  private _transId: string;

  constructor(amount: number, status: boolean, message: string, transId: string) {
    this._amount = amount;
    this._status = status;
    this._message = message;
    this._transId = transId;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get transId(): string {
    return this._transId;
  }

  set transId(value: string) {
    this._transId = value;
  }

  public static fromJSON(res: any): Purchase {
    return new Purchase(
      res.amount,
      res.status || '',
      res.message,
      res.transId || ''
    )
  }
}