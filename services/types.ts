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
// INTERFACES DE ERRO
// ============================================

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
