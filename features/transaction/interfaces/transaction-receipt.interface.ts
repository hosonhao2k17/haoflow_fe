import { ReceiptStatus } from "@/common/constants/app.constant";
import { Base } from "@/common/interfaces/base.interface";


export interface TransactionReceipt extends Base {
    id: string;
    imageUrl: string;
    ocrRawText?: string;
    parsedAmount: number;
    parsedMerchant?: string;
    parsedDate?: string;
    status: ReceiptStatus;
}