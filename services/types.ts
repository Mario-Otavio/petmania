// ============================================
// INTERFACES DE AUTENTICAÇÃO
// ============================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

// ============================================
// INTERFACES DE PETS
// ============================================

export interface PetImage {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Pet {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  foto?: PetImage;
}

export interface PaginatedResponse<T> {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: T[];
}

// ============================================
// INTERFACES DE ERRO
// ============================================

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
