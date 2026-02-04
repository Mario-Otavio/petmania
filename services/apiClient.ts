import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const API_BASE_URL = 'https://pet-manager-api.geia.vip';

// Criar instância do Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Requisição: Adicionar token automaticamente
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Verificar se estamos no ambiente do navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Tratamento de erros e refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Se o erro for 401 (não autorizado) e ainda não tentamos fazer refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tentar renovar o token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/autenticacao/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { access_token, refresh_token } = response.data;

          // Atualizar tokens no localStorage
          localStorage.setItem('token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          // Atualizar o header da requisição original
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          // Retentar a requisição original
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Se falhar ao renovar, limpar tokens e redirecionar para login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
