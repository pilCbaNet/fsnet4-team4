export class Register {
  nombre: string;
  nacimiento: Date;
  dni: number;
  password1: string;
  password2: string;
  email: string;

  constructor(email: string, password1: string,password2: string,dni: number,nombre: string,nacimiento: Date) {
    this.email = email;
    this.password1 = password1;
    this.password2 = password2;
    this.dni = dni;
    this.nombre = nombre; 
    this.nacimiento = nacimiento;

  }
}
