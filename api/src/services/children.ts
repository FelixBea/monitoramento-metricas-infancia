import childrenData from '../data/seed.json';
import { getPagination, Pagination } from '../utils/pagination';
import { ChildrenFilterValues, FilterFunction, ChildrenFilterKeys } from '../types/children';
import { NotFoundError } from '../middleware/errorHandler';
import { writeFileSync } from 'fs';

const alerts = ['saude', 'educacao', 'assistencia_social'];

const keyValueFilter: FilterFunction<ChildrenFilterValues> = (item, key, filters) => {
    return item[key] === filters[key];
};

const hasAlertsFilter: (item: any) => boolean = (item) => {
    return alerts.some((key) => item[key]?.alertas.length > 0);
};

const filterBy = {
    bairro: keyValueFilter,
    revisado: keyValueFilter,
    hasAlerts: hasAlertsFilter,
};

const filterChildren = (data: any[], filters: ChildrenFilterValues[]) => {
    return data.filter((child) => {
        let passedAllFilters = true;
        filters.forEach((filter: ChildrenFilterValues) => {
            const key = Object.keys(filter)[0] as ChildrenFilterKeys;
            if (!filterBy[key as ChildrenFilterKeys](child, key, filter)) {
                passedAllFilters = false;
            }
        });
        return passedAllFilters;
    });
};

const childrenService = {
    findAll(pagination: Pagination, filters: ChildrenFilterValues[]) {
        let filteredData = childrenData;

        if (filters.length) {
            filteredData = filterChildren(childrenData, filters);
        }

        return {
            data: getPagination(filteredData, pagination),
            totalResults: filteredData.length,
        };
    },
    findById(id: string) {
        const data = childrenData.find((item) => item.id === id);
        if (!data) {
            throw new NotFoundError('Record not found');
        }

        return data;
    },
    reviewById(id: string, user: string) {
        const child = this.findById(id);
        const index = childrenData.indexOf(child);
        console.log("index: ", index);
        child.revisado = true;
        child.revisado_em = new Date().toISOString();
        child.revisado_por = user;
        console.log('present status of array: ', childrenData);
        const patchedChildrenData = [...childrenData];
        patchedChildrenData[index] = child;
        writeFileSync('../data/seed.json', JSON.stringify(patchedChildrenData, null, 2), 'utf8');
    },
};

export default childrenService;
