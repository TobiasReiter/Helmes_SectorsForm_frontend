import axios from 'axios';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchSectors = async () => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/sectors`);
    return flattenSectors(response.data);
  } catch (error) {
    return error;
  }
};

export const flattenSectors = (sectors, depth = 0) => {
  return sectors.reduce((acc, current) => {
    const formattedSector = {
      id: current.id,
      name: `${current?.name}`,
      depth,
    };
    acc.push(formattedSector);

    if (current?.children && current?.children?.length > 0) {
      const children = flattenSectors(current?.children, depth + 1);
      acc = acc.concat(children);
    }

    return acc;
  }, []);
};

export const fetchUserData = async (username, setFormData, setErrors) => {
  const token = localStorage.getItem('username');
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/user/${username}`, {
      headers: {
        'X-Auth-Token': token,
      },
    });
    const userData = response.data;
    setFormData(prevFormData => ({
      ...prevFormData,
      name: userData.name,
      sectors: new Set(userData?.sectors),
      agreeToTerms: userData?.agreeToTerms,
    }));
    setErrors(prevErrors => ({ ...prevErrors, notfound: null }));
  } catch (error) {
    if (error.response.data) {
      setErrors(prevErrors => ({
        ...prevErrors,
        notfound: error?.response?.data?.message,
      }));
    }
  }
};
