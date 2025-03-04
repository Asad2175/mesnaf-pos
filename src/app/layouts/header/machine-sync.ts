export class MachineSync {
    private _branchName: string;
    private _name: string;
    private _registrationNo: string;
    private _machineSerialNo: string;

    constructor(branchName: string, name: string, registrationNo: string, machineSerialNo: string) {
        this._branchName = branchName;
        this._name = name;
        this._registrationNo = registrationNo;
        this._machineSerialNo = machineSerialNo;
    }

    public get branchName(): string {
        return this._branchName;
    }

    public set branchName(branchName: string) {
        this._branchName = branchName;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get registrationNo(): string {
        return this._registrationNo;
    }

    public set registrationNo(registrationNo: string) {
        this._registrationNo = registrationNo;
    }

    public get machineSerialNo(): string {
        return this._machineSerialNo;
    }

    public set machineSerialNo(machineSerialNo: string) {
        this._machineSerialNo = machineSerialNo;
    }

    public static fromJSON(response: any): MachineSync {
        return new MachineSync(
            response.branchName || '',
            response.merchant.name || '',
            response.merchant.registrationNo || '',
            response.machineSerialNo || ''
        );
    }
}
