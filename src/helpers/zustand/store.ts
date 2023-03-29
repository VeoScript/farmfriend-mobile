import { create } from 'zustand'
import * as type from './interface'

export const loginStore = create<type.LoginStoreProps>(set => ({
  isLoading: false,

  email: '',
  password: '',

  email_error: '',
  password_error: '',

  setEmail: (value: string) => set(() => ({ email: value })),
  setPassword: (value: string) => set(() => ({ password: value })),

  setEmailError: (value: string) => set(() => ({ email_error: value })),
  setPasswordError: (value: string) => set(() => ({ password_error: value })),

  setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
  setDefault: () => set(() => ({
    isLoading: false,
    email: '',
    password: '',
    email_error: '',
    password_error: ''
  })),
}))

export const createAccountStore = create<type.CreateAccountStoreProps>(set => ({
  isLoading: false,

  account_type: '',
  first_name: '',
  last_name: '',
  address: '',
  contact_num: '',
  email: '',
  password: '',
  repassword: '',

  account_type_error: '',
  first_name_error: '',
  last_name_error: '',
  address_error: '',
  contact_num_error: '',
  email_error: '',
  password_error: '',
  repassword_error: '',

  setAccountType: (value: string) => set(() => ({ account_type: value })),
  setFirstName: (value: string) => set(() => ({ first_name: value })),
  setLastName: (value: string) => set(() => ({ last_name: value })),
  setAddress: (value: string) => set(() => ({ address: value })),
  setContactNum: (value: string) => set(() => ({ contact_num: value })),
  setEmail: (value: string) => set(() => ({ email: value })),
  setPassword: (value: string) => set(() => ({ password: value })),
  setRePassword: (value: string) => set(() => ({ repassword: value })),

  setAccountTypeError: (value: string) => set(() => ({ account_type_error: value })),
  setFirstNameError: (value: string) => set(() => ({ first_name_error: value })),
  setLastNameError: (value: string) => set(() => ({ last_name_error: value })),
  setAddressError: (value: string) => set(() => ({ address_error: value })),
  setContactNumError: (value: string) => set(() => ({ contact_num_error: value })),
  setEmailError: (value: string) => set(() => ({ email_error: value })),
  setPasswordError: (value: string) => set(() => ({ password_error: value })),
  setRePasswordError: (value: string) => set(() => ({ repassword_error: value })),
  

  setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
  setDefault: () => set(() => ({
    isLoading: false,
    account_type: '',
    first_name: '',
    last_name: '',
    address: '',
    contact_num: '',
    email: '',
    password: '',
    repassword: '',
    account_type_error: '',
    first_name_error: '',
    last_name_error: '',
    address_error: '',
    contact_num_error: '',
    email_error: '',
    password_error: '',
    repassword_error: ''
  }))
}))

export const editAccountStore = create<type.EditAccountStoreProps>(set => ({
  isLoading: false,

  first_name: '',
  last_name: '',
  address: '',
  contact_num: '',
  email: '',

  old_password: '',
  new_password: '',
  repassword: '',

  first_name_error: '',
  last_name_error: '',
  address_error: '',
  contact_num_error: '',
  email_error: '',

  old_password_error: '',
  new_password_error: '',
  repassword_error: '',

  setFirstName: (value: string) => set(() => ({ first_name: value })),
  setLastName: (value: string) => set(() => ({ last_name: value })),
  setAddress: (value: string) => set(() => ({ address: value })),
  setContactNum: (value: string) => set(() => ({ contact_num: value })),
  setEmail: (value: string) => set(() => ({ email: value })),

  setOldPassword: (value: string) => set(() => ({ old_password: value })),
  setNewPassword: (value: string) => set(() => ({ new_password: value })),
  setRePassword: (value: string) => set(() => ({ repassword: value })),

  setFirstNameError: (value: string) => set(() => ({ first_name_error: value })),
  setLastNameError: (value: string) => set(() => ({ last_name_error: value })),
  setAddressError: (value: string) => set(() => ({ address_error: value })),
  setContactNumError: (value: string) => set(() => ({ contact_num_error: value })),
  setEmailError: (value: string) => set(() => ({ email_error: value })),

  setOldPasswordError: (value: string) => set(() => ({ old_password_error: value })),
  setNewPasswordError: (value: string) => set(() => ({ new_password_error: value })),
  setRePasswordError: (value: string) => set(() => ({ repassword_error: value })),

  setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),

  setDefaultAccountInfo: () => set(() => ({
    isLoading: false,
    first_name: '',
    last_name: '',
    address: '',
    contact_num: '',
    email: '',
    first_name_error: '',
    last_name_error: '',
    address_error: '',
    contact_num_error: '',
    email_error: '',
  })),
  setDefaultChangePassword: () => set(() => ({
    old_password: '',
    new_password: '',
    repassword: '',
    old_password_error: '',
    new_password_error: '',
    repassword_error: '',
  })),
}))

export const createProgramStore = create<type.CreateProgramProps>(set => ({
  isLoading: false,

  title: '',
  description: '',

  title_error: '',
  description_error: '',

  setTitle: (value: string) => set(() => ({ title: value })),
  setDescription: (value: string) => set(() => ({ description: value })),
  setTitleError: (value: string) => set(() => ({ title_error: value })),
  setDescriptionError: (value: string) => set(() => ({ description_error: value })),

  setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
  setDefault: () => set(() => ({
    isLoading: false,
    title: '',
    description: '',
    title_error: '',
    description_error: ''
  }))
}))
