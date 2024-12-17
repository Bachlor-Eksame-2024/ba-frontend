export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateFirstName(firstName: string): boolean {
  return firstName.length >= 2;
}

export function validateLastName(lastName: string): boolean {
  return lastName.length >= 2;
}

export function validatePhoneNumer(phone: string): boolean {
  const phoneRegex = /^\d{8}$/;
  return phoneRegex.test(phone);
}

export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
