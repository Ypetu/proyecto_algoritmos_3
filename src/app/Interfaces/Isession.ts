


// definimos que tiene que tener una request de login

export interface UserLoginRequest {
    email: string;
    password: string;
}



// definimos que tiene que tener una sesion 
// este tipo sera tambien devuelto por la api de login
export interface UserSession {
    id: number;
    name?: string;
    lastName?: string;
    rol?: string;
    email?: string;

    
} // defino la interfase AuthLoginResponse que es la respuesta de la api al hacer login

export interface AuthLoginResponse {
    
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: UserSession;
}
  

