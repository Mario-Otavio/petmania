import { AxiosError } from 'axios';
import apiClient from './apiClient';
import type { Pet, PaginatedResponse, ApiErrorResponse } from './types';

/**
 * Busca a lista de pets paginada
 * @param page - Número da página
 * @param size - Tamanho da página
 * @returns Promise com os dados dos pets
 */
export async function getPetsApi(page = 0, size = 10): Promise<PaginatedResponse<Pet>> {
  try {
    const response = await apiClient.get<PaginatedResponse<Pet>>('/v1/pets', {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ApiErrorResponse;
      throw new Error(errorData?.message || 'Falha ao buscar pets.');
    }
    throw new Error('Erro de conexão ao buscar pets.');
  }
}
