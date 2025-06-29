import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUserInfoResponse, ILoginResponse, ILoginRequest, IRegisterRequest, IUpdateProfileRequest } from '@/api/types'
import axios from 'axios'
import authApi from '@/api/authApi'
import { useNotification } from "@kyvg/vue3-notification";
import router from '@/router'

const { notify } = useNotification()

export const useUserStore = defineStore('userInfo', () => {
  const user = ref<IUserInfoResponse>({
    id: '',
    fullName: '',
    birthDate: '',
    gender: '',
    address: '',
    email: '',
    phoneNumber: ''
  })

  function $reset() {
    user.value = {
      id: '',
      fullName: '',
      birthDate: '',
      gender: '',
      address: '',
      email: '',
      phoneNumber: ''
    };
    localStorage.removeItem('userState');
  }

  function setUserInfo(info: IUserInfoResponse) {
    user.value = info;
    console.log('user info updated', user.value);
  }


  async function handleLogin(user: ILoginRequest) {
    try {
      const { data } = await authApi.post<ILoginResponse>('account/login', user);
      localStorage.setItem('jwt', data.token);
      await fetchUserInfo();
      notify({
        type: 'success',
        title: "Logged in",
      });
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Log in axios error: ', error.response?.data.message);
      } else {
        console.error('Log in unexpected error: ', error);
      }
    }
  }

  async function handleLogout() {
    try {
      await authApi.post('account/logout',);
      localStorage.removeItem('jwt');
      $reset();
      notify({
        type: 'success',
        title: 'Logged out',
      });
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Log out axios error: ', error.response?.data.message);
      } else {
        console.error('Log out unexpected error: ', error);
      }
    }
  }

  async function handleRegister(data: IRegisterRequest) {
    try {
      await authApi.post('account/register', data);
      notify({
        type: 'success',
        title: "Registered",
      });
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Register axios error: ', error.response?.data.message);
      } else {
        console.error('Register unexpected error: ', error);
      }
    }
  }

  async function handleUpdateInfo(data: IUpdateProfileRequest) {
    try {
      await authApi.put('account/profile', data);
      await fetchUserInfo();
      notify({
        type: 'success',
        title: "Info updated",
      });
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update user axios error: ', error.response?.data.message);
      } else {
        console.error('Update user unexpected error: ', error);
      }
    }
  }

  async function fetchUserInfo() {
    try {
      const { data } = await authApi.get<IUserInfoResponse>('account/profile',);
      setUserInfo(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Fetch user axios error: ', error.response?.data.message);
      } else {
        console.error('Fetch user unexpected error: ', error);
      }
    }
  }

  const loggedIn = computed<boolean>(() => user.value.id !== '');

  return { handleLogin, handleLogout, handleRegister, handleUpdateInfo, fetchUserInfo, user, loggedIn }
})