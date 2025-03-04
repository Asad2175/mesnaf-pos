import { ItemList } from "./item-list";

export class VerifyCoupon {
    private _amount: number;
    private _itemList: ItemList[]; // Specify the type if possible

    constructor(amount: number, itemList: ItemList[]){
        this._amount = amount;
        this._itemList = itemList;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get itemList(): ItemList[] {
        return this._itemList;
    }

    set itemList(value: ItemList[]) {
        this._itemList = value;
    }

    public static fromJSON(response: any): VerifyCoupon {
        return new VerifyCoupon(
            response.amount,
            response.itemList
        );
    }
}
