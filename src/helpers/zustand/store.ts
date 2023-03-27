import { create } from 'zustand'
import * as type from './interface'

export const authStore = create<type.AuthStoreProps>(set => ({
  userId: '',
  setUserId: (id: string) => set(() => ({ userId: id}))
}))

export const loginStore = create<type.LoginStoreProps>(set => ({
  email: '',
  password: '',

  setEmail: (value: string) => set(() => ({ email: value })),
  setPassword: (value: string) => set(() => ({ password: value })),

  setDefault: () => set(() => ({
    email: '',
    password: ''
  })),
}))

export const createAccountStore = create<type.CreateAccountStoreProps>(set => ({
  accountType: '',
  firstName: '',
  lastName: '',
  category: '',
  address: '',
  mobileNo: '',
  email: '',
  password: '',
  repassword: '',

  setAccountType: (value: string) => set(() => ({ accountType: value })),
  setFirstName: (value: string) => set(() => ({ firstName: value })),
  setLastName: (value: string) => set(() => ({ lastName: value })),
  setCategory: (value: string) => set(() => ({ category: value })),
  setAddress: (value: string) => set(() => ({ address: value })),
  setMobileNo: (value: string) => set(() => ({ mobileNo: value })),
  setEmail: (value: string) => set(() => ({ email: value })),
  setPassword: (value: string) => set(() => ({ password: value })),
  setRePassword: (value: string) => set(() => ({ repassword: value })),
  
  setDefault: () => set(() => ({
    accountType: '',
    firstName: '',
    lastName: '',
    category: '',
    address: '',
    mobileNo: '',
    email: '',
    password: '',
    repassword: ''
  }))
}))