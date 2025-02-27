export interface PurchaseItem {
    status: boolean;
    message: string;
    cardNo: string | null;
    startTransDate: string;
    endTransDate: string;
    amount: number;
    transId: string | null;
    transType: number;
    accessCode: string;
    charityName: string | null;
    charityNo: string | null;
  }
  