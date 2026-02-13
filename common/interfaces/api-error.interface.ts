import { ErrorDetail } from "./error-detail.interface";


export interface ApiError {
    message: string;
    statusCode: number;
    error: string;
    errorCode: string;
    timestamp: string;
    details?: ErrorDetail[];
}