export interface signIn {
  email: string;
  password: string;
}

export interface signUp {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface forget {
  email: string;
}

export interface Rest {
  resetCode: string;
}

export interface ResetPassword {
  email: string;
  newPassword: string;
}
