import axios from 'axios';
import { router } from 'next/client';
import api from "@/data/dataBase";

export const validateToken = async () => {
  try {
    const res = await api.post('/auth/validateToken',{});
    return res;
  } catch (error: any) {
    console.error('Error validating token:', error.response || error.message);
  }
};
