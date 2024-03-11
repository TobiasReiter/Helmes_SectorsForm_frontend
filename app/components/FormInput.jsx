import React from 'react';
import ActionButton from '../components/ActionButton';

export default function FormInput({ label, id, name, value, type, onChange, error, fillForm }) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="pt-4 pb-2">
        {label}
      </label>
      <div className="flex w-full">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`p-2 rounded-l-md flex-grow ${error ? 'border-red-500 border-2' : ''}`}
        />
        <ActionButton type="button" onClick={fillForm} className="rounded-r-md">
          Refill Form
        </ActionButton>
      </div>
      <p className={`text-red-500 min-h-5`}>{error}</p>
    </div>
  );
}
