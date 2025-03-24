import { ItemList } from "../../pages/purchase/coupen/item-list"

export interface Print {
    charityName: string,
    charityNumber: number,
    cardNo: string
    purchaseAmount: string,
    purchaseStatus: string,
    purchaseTransId: number,
    approvedRejectedDateTime: string
    itemList?: ItemList[],
    message?:string
}
