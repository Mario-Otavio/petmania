import { AxiosError } from 'axios';
import apiClient from './apiClient';
import type { Pet, RespostaPaginada, RespostaErroApi } from './types';

/**
 * Busca a lista de pets paginada
 * @param pagina - Número da página
 * @param tamanho - Tamanho da página
 * @param nome - (Opcional) Nome do pet para filtrar
 * @param raca - (Opcional) Raça do pet para filtrar
 * @returns Promise com os dados dos pets
 */
export async function buscarPetsApi(pagina = 0, tamanho = 10, nome?: string, raca?: string): Promise<RespostaPaginada<Pet>> {
  try {
    const response = await apiClient.get<RespostaPaginada<Pet>>('/v1/pets', {
      params: { page: pagina, size: tamanho, nome, raca },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as RespostaErroApi;
      throw new Error(errorData?.message || 'Falha ao buscar pets.');
    }
    throw new Error('Erro de conexão ao buscar pets.');
  }
}
