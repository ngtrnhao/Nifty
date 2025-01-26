export const validateRegisterInput = (formData) => {
  const errors = {};

  //Validate name
  if (!formData.name.trim()) {
    errors.name = 'Họ và tên không được để trống';
  } else if (formData.name.length < 2) {
    errors.name = 'Họ và tên phải có ít nhất 2 ký tự';
  }

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
  //Validate confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu không khớp';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
