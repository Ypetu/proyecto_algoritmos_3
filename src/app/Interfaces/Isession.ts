


// definimos que tiene que tener una request de login

export interface UserLoginRequest {
    email: string;
    password: string;
}



// definimos que tiene que tener una sesion 
// este tipo sera tambien devuelto por la api de login
export interface UserSession {
    id: number;
    nombre?: string;
    rol?: string;
    email?: string;

    
}
// formarto de token response -- esto deberia ir en todos los headers de las peticiones a la api
export interface sessionTokenResponse { 
    token?: string;
}