export class MonthlyReport {
    private _totalApprovedAmount: number;
    private _totalApprovedTrans: number;
    private _totalRejectedAmount: number;
    private _totalRejectedTrans: number;
  
    constructor(
      totalApprovedAmount: number,
      totalApprovedTrans: number,
      totalRejectedAmount: number,
      totalRejectedTrans: number
    ) {
      this._totalApprovedAmount = totalApprovedAmount;
      this._totalApprovedTrans = totalApprovedTrans;
      this._totalRejectedAmount = totalRejectedAmount;
      this._totalRejectedTrans = totalRejectedTrans;
    }
  
    get totalApprovedAmount(): number {
      return this._totalApprovedAmount;
    }
  
    get totalApprovedTrans(): number {
      return this._totalApprovedTrans;
    }
  
    get totalRejectedAmount(): number {
      return this._totalRejectedAmount;
    }
  
    get totalRejectedTrans(): number {
      return this._totalRejectedTrans;
    }
  
    set totalApprovedAmount(value: number) {
      this._totalApprovedAmount = value;
    }
  
    set totalApprovedTrans(value: number) {
      this._totalApprovedTrans = value;
    }
  
    set totalRejectedAmount(value: number) {
      this._totalRejectedAmount = value;
    }
  
    set totalRejectedTrans(value: number) {
      this._totalRejectedTrans = value;
    }

    public static fromJSON(response: any): MonthlyReport {
        return new MonthlyReport(
            response.totalApprovedAmount,
            response.totalApprovedTrans,
            response.totalRejectedAmount,
            response.totalRejectedTrans,
        );
    }
  }
  