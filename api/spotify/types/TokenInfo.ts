export interface TokenInfo {
  access_token: string;
  token_type: 'bearer' | 'basic';
  expires_in: number;
}
