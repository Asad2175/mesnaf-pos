export class AssertionUtils {
    public static isNullOrUndefined<T>(data: T): boolean {
        return data === undefined || data === null;
    }

    // public static isEmpty(value: any[]| string | undefined): boolean {
    //     return 
    // }
}