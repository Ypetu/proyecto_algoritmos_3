


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
    apellido?: string;
    rol?: string;
    email?: string;

    
}
