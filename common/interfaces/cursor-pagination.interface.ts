import { BaseQuery } from "./base-query.interface";


export interface CursorPaginationDto extends BaseQuery {
    afterCursor?: Date;
    beforeCursor?: Date;
}