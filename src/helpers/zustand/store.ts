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