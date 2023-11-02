export interface IPagination{
    hasNextPage: boolean,
    hasPrevPage: boolean,
    limit: number,
    nextPage: number,
    page: number,
    totalDocs: number,
    totalPages: number
}
