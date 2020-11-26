import { ReactNode } from 'react'

interface ITableToolbar {
    selected: string[]
    isLoading?: boolean
    title?: string
    searchText: string
    updateSearchText: (value: string) => void
    columns: IColumn[]
    ToggleCloseDropDownMenu: () => void
    onDelete?: (selected: Array<string>) => void
    columnChecked: ColumnChecked[]
    handleToggleCheck: (col: ColumnChecked) => () => void
    toolbarCustomItems?: ReactNode
    onChangeFilterValue: (arg0: string, column: string) => void
}

// type DropDownMenuType = {
//     ToggleCloseDropDownMenu: () => void
//     columnChecked: ColumnChecked[]
//     handleToggleCheck: (col: ColumnChecked) => () => void
// }
type ToolbarColumnDisplayType = {
    columnChecked: ColumnChecked[]
    handleToggleCheck: (col: ColumnChecked) => () => void
}
interface ToolbarFilter {
    columns: IColumn[] | ColumnChecked[]
    items: JSX.Element
    icon: JSX.Element
}

type TableHeadPropsType = {
    numSelected: number
    order: 'desc' | 'asc'
    orderBy: string
    rowCount: number
    onSelectAllClick: (e: any) => void
    onRequestSort: (e: any, property: string) => void
    columns: IColumn[]
    columnChecked: ColumnChecked[]
    toolbarOptions?: toolbarOptions
}
type Order = 'asc' | 'desc'
type ColumnChecked = {
    label: string
    checked: boolean
}
interface IColumn {
    id: string
    name: string
    label: string

    disablePadding?: boolean
    format?: (value: any) => any
    visible?: boolean
    filterable?: boolean
    isKey?: boolean
    alignment?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
}

interface IGenericDataTable {
    data?: any
    columns: IColumn[]
    onRowClick?: (row: any) => void
    onRowDelete?: (selected: string[]) => void
    //onPagination?: (page: number, count: number) =>void
    toolbarOptions?: toolbarOptions
    pagination?: {
        handleRemotePagination: (newPage: number, rowsPerPage: number) => void
        count: number
        isLoading?: boolean
    }
}
interface ChipData {
    key: string
    label: string
}

type toolbarOptions = {
    title?: string
    remote?: boolean
    searchRemote?: (searchText: string, data: any) => any
    toolbarCustomItems?: ReactNode
    onDelete?: () => void
    checkBox?: boolean
    selection?: 'multiple' | 'single'
}

export type {
    toolbarOptions,
    Order,
    IColumn,
    IGenericDataTable,
    ChipData,
    TableHeadPropsType,
    ITableToolbar,
    ToolbarFilter,
    ToolbarColumnDisplayType,
}
