import React from 'react';

type Props = {
    checked: boolean;
    label: string;
    onChange: (checked: boolean) => void;
}

export default function Checkbox({label, checked, onChange}: Props) {
    return (
        <label className="flex items-center">
            <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer"/>
            <span
                className="mr-2 flex items-center w-6 h-4 ~bg-gray-100 peer-checked:bg-emerald-300 rounded-full shadow-inner transition-colors"
            />
            <span
                className="absolute left-0.5 top-0.5 w-3 h-3 ~bg-dropdown rounded-full shadow-md transform peer-checked:translate-x-2 transition-transform"
            />
            <span className="uppercase tracking-wider text-xs font-medium">{label}</span>
        </label>
    )
}
