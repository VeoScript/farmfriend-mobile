export interface AuthStoreProps {
  userId: string
  setUserId: (value: string) => void
}

export interface LoginStoreProps {
  email: string
  password: string

  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setDefault: () => void
}

export interface CreateAccountStoreProps {
  accountType: string
  firstName: string
  lastName: string
  address: string
  mobileNo: string
  email: string
  password: string
  repassword: string

  setAccountType: (value: string) => void
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
  setAddress: (value: string) => void
  setMobileNo: (value: string) => void
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setRePassword: (value: string) => void
  setDefault: () => void
}