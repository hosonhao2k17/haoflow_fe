


export interface AiResponse<T> {
    module: string;
    message: string;
    data: T;
    summary: string;
}