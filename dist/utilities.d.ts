import { Order } from './types';
export declare function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[];
export declare function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: {
    [key in Key]: number | string;
}, b: {
    [key in Key]: number | string;
}) => number;
export declare const createRowCells: any;
export declare const searchFn: (searchText: string, data: any, columns: any) => any;
export declare const filterAllColumns: (filter: {
    name: string;
    value: string;
}[], data: any) => any;
