import childrenData from '../data/seed.json';
import { getPagination, Pagination } from '../utils/pagination';
import { ChildrenFilterValues, FilterFunction, ChildrenFilterKeys } from '../types/children';
import children from '../routes/children';

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
}

const childrenService = {
    findAll(pagination: Pagination, filters: ChildrenFilterValues[]) {
        let filteredData = childrenData;

        console.log("filters: ", filters);

        if (filters.length) {
            filteredData = filterChildren(childrenData, filters);
        }

        return {
            data: getPagination(filteredData, pagination),
            totalResults: filteredData.length,
        };
    },
    findById(id: string) {
        return childrenData.find((item) => item.id === id);
    },
};

export default childrenService;
