export interface BaseApiResponse<T> {
    status: number;
    message: string;
    timestamp: string;
    error: unknown;
    path: unknown;
    data: T;
}