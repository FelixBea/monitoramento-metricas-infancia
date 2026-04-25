export interface Pagination {
    page?: number | null;
    size?: number | null;
}

export const INITIAL_PAGE = 1;
export const DEFAULT_SIZE = 10;

export const getPagination = (list: any[], { page, size }: Pagination) => {
    if(!page || page < 1) page = INITIAL_PAGE;
    if(!size || size < 1) size = DEFAULT_SIZE;
    const startAt = (page - 1) * size;
    return list.slice(startAt, startAt + size);
};
