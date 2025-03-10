export const validateRegisterData = (data) => {
  const errors = {};

  if (!data.username?.trim()) {
    errors.username = 'Username không được để trống';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  if (!data.password) {
    errors.password = 'Password không được để trống';
  } else if (data.password.length < 8) {
    errors.password = 'Password phải có ít nhất 8 ký tự';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginData = (data) => {
  const errors = {};
  
  if (!data.email) {
    errors.email = 'Email không được để trống';
  }
  
  if (!data.password) {
    errors.password = 'Password không được để trống';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
