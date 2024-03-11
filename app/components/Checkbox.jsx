import React from 'react';

export default function Checkbox({ label, id, name, checked, onChange, error }) {
  return (
    <div className="items-center pb-4 pt-4">
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
      <label htmlFor={id} className="pl-2">
        {label}
      </label>
      <p className={`text-red-500 min-h-5`}>{error}</p>
    </div>
  );
}
