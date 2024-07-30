import React, { InputHTMLAttributes } from 'react';

export interface InputProps
    extends React.DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

export type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};

export type SelectProps = React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
> & { options: Option[] };
