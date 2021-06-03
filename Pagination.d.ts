/// <reference types="react" />
interface PaginationProps {
    limit?: number;
    total: number;
    page?: number;
    pagesOnly?: boolean;
    limitRange?: boolean | number[];
    onPageChange?: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}
declare const Pagination: (props: PaginationProps) => JSX.Element;
export default Pagination;
