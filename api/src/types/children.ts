export interface ChildrenFilterValues {
    bairro?: string;
    hasAlerts?: boolean;
    revisado?: boolean;
}
export type ChildrenFilterKeys = 'bairro'|'hasAlerts'|'revisado';

export type FilterFunction<P> = (item: any, key: keyof P, filters: P) => boolean | unknown

export type ChildrenFilters = {
   [a: string]: FilterFunction<ChildrenFilterValues>;
}