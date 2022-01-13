/// <reference types="react" />
declare type Props = {
    checked: boolean;
    label: string;
    onChange: (checked: boolean) => void;
};
export default function Checkbox({ label, checked, onChange }: Props): JSX.Element;
export {};
