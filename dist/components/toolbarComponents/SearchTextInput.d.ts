import * as React from 'react';
export interface SearchTextInputProps {
    searchText: string;
    updateSearchText: (value: string) => void;
}
export declare const SearchTextInput: React.FunctionComponent<SearchTextInputProps>;
