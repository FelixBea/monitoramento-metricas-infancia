export interface Pagination {
    page?: number;
    size?: number;
}

export const getPagination = (list: any[], {page = 1, size = 10}: Pagination) => {
    if (page < 1) page = 1;
    if (size < 1) size = 1;
    const startAt = (page - 1) * size;
    return list.slice(startAt, startAt + size);
};
