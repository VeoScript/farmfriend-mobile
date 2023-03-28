export interface LoginStoreProps {
  isLoading: boolean

  email: string
  password: string

  email_error: string
  password_error: string

  setEmail: (value: string) => void
  setPassword: (value: string) => void

  setEmailError: (value: string) => void
  setPasswordError: (value: string) => void

  setIsLoading: (value: boolean) => void
  setDefault: () => void
}

export interface CreateAccountStoreProps {
  isLoading: boolean

  account_type: string
  first_name: string
  last_name: string
  address: string
  contact_num: string
  email: string
  password: string
  repassword: string

  account_type_error: string,
  first_name_error: string,
  last_name_error: string,
  address_error: string,
  contact_num_error: string,
  email_error: string,
  password_error: string
  repassword_error: string

  setAccountType: (value: string) => void
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
  setAddress: (value: string) => void
  setContactNum: (value: string) => void
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setRePassword: (value: string) => void

  setAccountTypeError: (value: string) => void
  setFirstNameError: (value: string) => void
  setLastNameError: (value: string) => void
  setAddressError: (value: string) => void
  setContactNumError: (value: string) => void
  setEmailError: (value: string) => void
  setPasswordError: (value: string) => void
  setRePasswordError: (value: string) => void

  setIsLoading: (value: boolean) => void
  setDefault: () => void
}

export interface EditAccountStoreProps {
  isLoading: boolean

  first_name: string
  last_name: string
  address: string
  contact_num: string
  email: string

  old_password: string
  new_password: string
  repassword: string

  first_name_error: string
  last_name_error: string
  address_error: string
  contact_num_error: string
  email_error: string

  old_password_error: string
  new_password_error: string
  repassword_error: string

  setFirstName: (value: string) => void
  setLastName: (value: string) => void
  setAddress: (value: string) => void
  setContactNum: (value: string) => void
  setEmail: (value: string) => void

  setOldPassword: (value: string) => void
  setNewPassword: (value: string) => void
  setRePassword: (value: string) => void

  setFirstNameError: (value: string) => void,
  setLastNameError: (value: string) => void,
  setAddressError: (value: string) => void,
  setContactNumError: (value: string) => void,
  setEmailError: (value: string) => void,

  setOldPasswordError: (value: string) => void,
  setNewPasswordError: (value: string) => void,
  setRePasswordError: (value: string) => void,

  setIsLoading: (value: boolean) => void
  setDefaultAccountInfo: () => void
  setDefaultChangePassword: () => void
}
