// 이메일 유효성 검사
export function validateEmail(value: string): boolean {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

// 이름 유효성 검사
export function validateUserName(value: string): boolean {
  return /^[가-힣]{2,}$/.test(value) || /^[A-Za-z]{3,}$/.test(value);
}

// 전화번호 유효성 검사
export function validatePhoneNumber(value: string): boolean {
  return /^(01[016789])[-\s]?(\d{3,4})[-\s]?(\d{4})$/.test(value);
}

// 비밀번호 유효성 검사 (영문 대소문자, 숫자, 특수문자 포함 8자리 이상)
export function validatePassword(value: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-^(){}[\].,;:\\/|<>=`"~])[A-Za-z\d@$!%*?&#+\-^(){}[\].,;:\\/|<>=`"~]{8,}$/.test(
    value,
  );
}

// 비밀번호 확인 유효성
export function validatePasswordConfirmation(
  password: string,
  confirmPassword: string,
): boolean {
  return password === confirmPassword;
}

// 카드번호 유효성 검사
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.split('').map((num) => parseInt(num));
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[digits.length - 1 - i]; // 배열의 끝에서부터 시작
    if (i % 2 === 1) {
      // 짝수번째 자리 (0-indexed 이므로 1을 더해줌)
      digit = digit * 2;
      if (digit > 9) {
        digit = digit - 9; // 또는 digit = digit % 10 + 1
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}
