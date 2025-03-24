import { ItemList } from "./coupen/item-list";

export class Purchase {
  private _amount: number;
  private _status: boolean;
  private _message: string;
  private _transId: string;
  private _charityName: string;
  private _charityNo: string;
  private _cardNo: string;
  private _startTransDate: string;
  private _itemList: ItemList[]; 

  constructor(amount: number, status: boolean, message: string, transId: string, charityName: string, charityNo: string, cardNo: string, startTransDate: string, itemList?: ItemList[]) {
    this._amount = amount;
    this._status = status;
    this._message = message;
    this._transId = transId;
    this._charityName = charityName;
    this._charityNo = charityNo;
    this._cardNo = cardNo;
    this._startTransDate = startTransDate;
    this._itemList = itemList ?? [];
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

  get charityName(): string {
    return this._charityName;
  }

  set charityName(value: string) {
    this._charityName = value;
  }

  get charityNo(): string {
    return this._charityNo;
  }

  set charityNo(value: string) {
    this._charityNo = value;
  }

  get cardNo(): string {
    return this._cardNo;
  }

  set cardNo(value: string) {
    this._cardNo = value;
  }

  get startTransDate(): string {
    return this._startTransDate;
  }

  set startTransDate(value: string) {
    this._startTransDate = value;
  }

  get itemList(): ItemList[] {
    return this._itemList;
}

set itemList(value: ItemList[]) {
    this._itemList = value;
}

  public static fromJSON(res: any): Purchase {
    return new Purchase(
      res.amount.toFixed(2),
      res.status || '',
      res.message,
      res.transId || '',
      res.charityName,
      res.charityNo,
      res.cardNo,
      res.startTransDate,
      res.itemList ?? []
    )
  }
}