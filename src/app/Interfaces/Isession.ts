


// definimos que tiene que tener una request de login

export interface UserLoginRequest {
    email: string;
    password: string;
}

// definimos que tiene que tener una sesion
export interface UserSession {
    email: string;
    nombre?: string;
    rol?: string;
}