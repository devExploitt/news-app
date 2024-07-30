import { forwardRef } from 'react';
import styles from './Search.module.scss';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import styled from 'styled-components';

const SearchWrapper = styled.div`
    .search-wrapper {
        position: relative;
    }
`;

const SearchInput = styled.input`
    .input {
        font-size: inherit;
        font-style: normal;
        font-weight: 400;
        color: var(--text-secondary-color);
        background-color: #fcfcfd;
        border: 1px solid var(--text-secondary-color);
        border-radius: 5px;
        padding: 6px 22px;
        min-width: 120px;
        max-width: 180px;
    }
`;

const SearchIcon = styled.img`
    .icon {
        position: absolute;
        left: 3px;
        top: 6px;
    }
`;

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <SearchWrapper>
            <SearchInput
                ref={ref}
                className={cn(className, {
                    [styles['invalid']]: isValid
                })}
                {...props}
            />
            <SearchIcon src='/search.svg' alt='Иконка лупы' />
        </SearchWrapper>
    );
});

export default Search;
