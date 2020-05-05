export interface LoginDTO {
  userName: string;
  password: string;
}

export interface RegisterDTO {
  userName: string;
  password: string;  
  seller?: boolean;
}