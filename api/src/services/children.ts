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

const childrenService = {
    findAll(pagination: Pagination, filters: ChildrenFilterValues) {
        const filteredData = Object.keys(filters).length
            ? childrenData.filter((child) => {
                  return Object.keys(filters).some((key: any) => filterBy[key as ChildrenFilterKeys](child, key, filters));
              })
            : childrenData;
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
