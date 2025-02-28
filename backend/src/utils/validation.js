export const validateEmail = (email) => {
  const errors = [];

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
    errors.password = 'Password phải có ít 8 ký tự';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
