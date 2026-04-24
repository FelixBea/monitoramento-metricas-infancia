import childrenData from '../data/seed.json';
import { getPagination, Pagination } from '../utils/pagination';

const childrenService = {
    findAll(pagination: Pagination) {
        return {
            data: getPagination(childrenData, pagination),
            totalResults: childrenData.length,
        };
    },
    findById(id: string) {
        return childrenData.find((item) => item.id === id);
    },
};

export default childrenService;
