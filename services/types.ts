// ============================================
// INTERFACES DE AUTENTICAÇÃO
// ============================================

export interface RequisicaoLogin {
  username: string;
  password: string;
}

export interface RespostaLogin {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface RespostaRefreshToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

// ============================================
// INTERFACES DE PETS
// ============================================

export interface ImagemPet {
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
  foto?: ImagemPet;
}

export interface RespostaPaginada<T> {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: T[];
}

// ============================================
// INTERFACES DE ERRO
// ============================================

export interface RespostaErroApi {
  message?: string;
  error?: string;
  statusCode?: number;
}
