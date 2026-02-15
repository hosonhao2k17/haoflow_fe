import { SortOrder } from "../constants/app.constant";


export interface BaseQuery {
    sortBy?: string;
    sortOrder?: SortOrder
}