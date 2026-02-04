import { AxiosError } from 'axios';
import apiClient from './apiClient';
import type { LoginRequest, LoginResponse, RefreshTokenResponse, ApiErrorResponse } from './types';
import Cookies from 'js-cookie';

/**
 * Realiza o login do usuário
 * @param credentials - Credenciais de login (username e password)
 * @returns Promise com os dados de autenticação
 */
export async function loginApi(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>('/autenticacao/login', credentials);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ApiErrorResponse;
      throw new Error(errorData?.message || 'Falha na autenticação. Verifique suas credenciais.');
    }
    throw new Error('Erro de conexão. Verifique sua rede ou tente novamente mais tarde.');
  }
}

/**
 * Renova o token de acesso usando o refresh token
 * @param refreshToken - Token de atualização
 * @returns Promise com os novos tokens
 */
export async function refreshTokenApi(refreshToken: string): Promise<RefreshTokenResponse> {
  try {
    const response = await apiClient.post<RefreshTokenResponse>(
      '/autenticacao/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ApiErrorResponse;
      throw new Error(errorData?.message || 'Falha ao renovar o token. Faça login novamente.');
    }
    throw new Error('Erro de conexão ao renovar token.');
  }
}

/**
 * Realiza o logout do usuário (limpa tokens locais e cookies)
 */
export function logoutApi(): void {
  if (typeof window !== 'undefined') {
    // Limpar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    
    // Limpar Cookies
    Cookies.remove('token');
    Cookies.remove('refresh_token');
  }
}

/**
 * Verifica se o usuário está autenticado
 * @returns true se houver token válido
 */
export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token;
  }
  return false;
}

/**
 * Obtém o token de acesso atual
 * @returns Token de acesso ou null
 */
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}
