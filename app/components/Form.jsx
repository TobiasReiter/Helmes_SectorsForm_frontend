'use client';

import React from 'react';
import FormInput from './FormInput';
import SectorList from './SectorList';
import Checkbox from './Checkbox';
import useFormData from '../hooks/useFormData';
import ActionButton from './ActionButton';

export default function Form() {
  const { formData, sectors, errors, handleInputChange, handleOptionClick, fillFormWithUserData, handleSubmit } =
    useFormData();

  return (
    <div className="bg-gray-400 sm:w-96 w-full mx-auto rounded-md p-5">
      <h1 className="text-black text-center mb-5">
        Please enter your name and pick the sectors you are currently involved in.
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <FormInput
          label="Name:"
          id="name"
          name="name"
          value={formData?.name}
          type="text"
          onChange={handleInputChange}
          error={errors?.name || errors?.notfound}
          fillForm={fillFormWithUserData}
        />

        <SectorList
          sectors={sectors}
          error={errors?.sectors}
          selectedSectors={formData?.sectors}
          onSectorClick={handleOptionClick}
        />

        <Checkbox
          label="Agree to terms"
          id="terms"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
        />

        <ActionButton type="submit" className="rounded-md">
          Save
        </ActionButton>
      </form>
    </div>
  );
}
