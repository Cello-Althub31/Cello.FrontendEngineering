export const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isValidPassword = (password: string) => {
  const minLength = /.{8,}/;
  const hasUppercase = /[A-Z]/;
  const hasNumber = /[0-9]/;

  if (!minLength.test(password)) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasUppercase.test(password)) {
    return "Password must include at least one uppercase letter";
  }
  if (!hasNumber.test(password)) {
    return "Passord must include at least one number";
  }

  return null;
};
