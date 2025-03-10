export const validateRegisterData = (data) => {
  const errors = {};

  // Validate username
  if (!data.username?.trim()) {
    errors.username = 'Username không được để trống';
  } else if (data.username.length < 3) {
    errors.username = 'Username phải có ít nhất 3 ký tự';
  } else if (data.username.length > 30) {
    errors.username = 'Username không được vượt quá 30 ký tự';
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.username = 'Username chỉ được chứa chữ cái, số và dấu gạch dưới';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  // Validate password
  if (!data.password) {
    errors.password = 'Password không được để trống';
  } else if (data.password.length < 8) {
    errors.password = 'Password phải có ít nhất 8 ký tự';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = 'Password phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
  }

  // Validate full_name (nếu có)
  if (data.full_name && data.full_name.length > 50) {
    errors.full_name = 'Họ tên không được vượt quá 50 ký tự';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginData = (data) => {
  const errors = {};

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  // Validate password
  if (!data.password) {
    errors.password = 'Password không được để trống';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEmailOnly = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email không được để trống';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Email không hợp lệ';
  }
};
