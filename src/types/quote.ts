export type Destination =
  | 'nacional'
  | 'americas'
  | 'europa';

export type Addon =
  | 'bagagem'
  | 'esportes_aventura';

export interface Traveler {
  nome: string;
  data_nascimento: string;
  adicionais: Addon[];
}

export interface QuoteRequest {
  destino: Destination;
  data_inicio: string;
  data_fim: string;
  viajantes: Traveler[];
}

export interface QuoteResponse {
  dias_cobrados: number;

  viajantes: {
    nome: string;
    idade: number;
    subtotal: number;
    adicionais_aplicados: string[];
  }[];

  avisos: string[];

  desconto_grupo_percentual: number;

  total_final: number;
}