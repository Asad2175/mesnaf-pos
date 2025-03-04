export class ItemList {
    private _itemName: string;
    private _itemUnit: string;
    private _qty: number;

    constructor(itemName: string, itemUnit: string, qty: number) {
        this._itemName = itemName;
        this._itemUnit = itemUnit;
        this._qty = qty;
    }

    get itemName(): string {
        return this._itemName;
    }

    set itemName(value: string) {
        this._itemName = value;
    }

    get itemUnit(): string {
        return this._itemUnit;
    }

    set itemUnit(value: string) {
        this._itemUnit = value;
    }

    get qty(): number {
        return this._qty;
    }

    set qty(value: number) {
        this._qty = value;
    }
}