import { getPagination, Pagination } from '../utils/pagination';
import { ChildrenFilterValues, FilterFunction, ChildrenFilterKeys } from '../types/children';
import { NotFoundError } from '../middleware/errorHandler';
import childrenRepository from '../repositories/children';

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
    async findAll(pagination: Pagination, filters: ChildrenFilterValues[]) {
        let filteredData: any = await childrenRepository.findAll();
        console.log("filteredData: ", filteredData);

        if (filters.length) {
            filteredData = filterChildren(filteredData, filters);
        }

        return {
            data: getPagination(filteredData, pagination),
            totalResults: filteredData.length,
        };
    },
    async findById(id: string) {
        const data = await childrenRepository.findById(id);
        if (!data) {
            throw new NotFoundError('Record not found');
        }

        return data;
    },
    async reviewById(id: string, user: string) {
        const payload = { revisado: true, revisado_em: new Date().toISOString(), revisado_por: user };
        console.log("payload: ", payload);
        await childrenRepository.reviewById(id, payload);
        console.log("ended review");
    },
};

export default childrenService;
