export const validateRegisterInput = (data) => {
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

export const validateLoginInput = (formData) => {
  const errors = {};
  //Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Email không hợp lệ';
  }
  //Validate password
  if (!formData.password) {
    errors.password = 'Mật khẩu không được để trống';
  } else if (formData.password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự ';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
