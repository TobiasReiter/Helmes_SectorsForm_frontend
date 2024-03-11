import { useState, useEffect, useCallback } from 'react';
import { fetchSectors, fetchUserData } from '../utils/fetchData';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function useFormData() {
  const [formData, setFormData] = useState({
    name: '',
    sectors: new Set(),
    agreeToTerms: false,
  });
  const [sectors, setSectors] = useState([]);
  const [errors, setErrors] = useState({});
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleInputChange = useCallback(event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue,
    }));
  }, []);

  const handleOptionClick = useCallback(sectorId => {
    setFormData(prevFormData => {
      const newSectors = new Set(prevFormData.sectors);
      if (newSectors.has(sectorId)) {
        newSectors.delete(sectorId);
      } else {
        newSectors.add(sectorId);
      }
      return { ...prevFormData, sectors: newSectors };
    });
  }, []);

  const fillFormWithUserData = useCallback(() => {
    const userNameToFetch = formData.name;
    if (userNameToFetch) {
      fetchUserData(userNameToFetch, setFormData, setErrors);
    } else {
      setFormData({
        name: '',
        sectors: new Set(),
        agreeToTerms: false,
      });
    }
  }, [formData.name]);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const sectorsArray = Array.from(formData?.sectors);

      const submissionData = {
        ...formData,
        sectors: sectorsArray,
      };
      try {
        const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/api/save-form`, submissionData, {
          headers: {
            'X-User-Name': formData?.name,
          },
        });
        if (response.status === 200) {
          localStorage.setItem('username', formData?.name);
          toast.promise(Promise.resolve(response), {
            success: `Hey ${formData?.name}, your data is saved!`,
            error: 'There was an error! Please try again.',
          });
        }
        setErrors({});
      } catch (error) {
        if (error?.response && error?.response?.data && error?.response?.data?.errors) {
          setErrors(error?.response?.data?.errors);
        } else {
          console.error(error);
        }
      }
    },
    [formData, NEXT_PUBLIC_BACKEND_URL]
  );

  useEffect(() => {
    const getSectors = async () => {
      const sectorsData = await fetchSectors();
      setSectors(sectorsData);
    };

    getSectors();
  }, []);

  return {
    formData,
    sectors,
    errors,
    handleInputChange,
    handleOptionClick,
    fillFormWithUserData,
    handleSubmit,
  };
}
