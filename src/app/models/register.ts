export class Register {
  nombre: string;
  dni: number;
  password1: string;
  password2: string;
  email: string;

  constructor(email: string, password1: string,password2: string,dni: number,nombre: string) {
    this.email = email;
    this.password1 = password1;
    this.password2 = password2;
    this.dni = dni;
    this.nombre = nombre; 

  }
}
