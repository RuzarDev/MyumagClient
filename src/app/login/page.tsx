'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch} from 'react-redux';
import { WriteToken } from "@/lib/slices/AuthSlice"
import { validateToken } from '@/app/utils/validateToken';
import api from "@/data/dataBase";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

const LoginBox = styled.div`
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const authorizhationByToken = async () => {
      try {
        const res = await validateToken(); // обязательно await
        if (res) {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Token validation failed', err);
      }
    };

    authorizhationByToken()
  }, [router]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await api.post(
        '/auth/login',
        {
          phone: username,
          password,
        }
      );

      if (response.status === 201) {
        dispatch(WriteToken(response.data.access_token));
        console.log(document.cookie);
        router.push('/dashboard');
      }

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Phone number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        <button
          className={'mt-3 text-blue-900 hover:underline cursor-pointer'}
          onClick={() => router.push('/register')}
        >
          Зарегистрироваться
        </button>
      </LoginBox>
    </Container>
  );
}
