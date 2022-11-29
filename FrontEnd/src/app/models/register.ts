export class Register {
  nombre: string;
  nacimiento: Date;
  dni: number;
  password: string;
  email: string;

  constructor(email: string, password1: string,dni: number,nombre: string,nacimiento: Date) {
    this.email = email;
    this.password = password1;
    this.dni = dni;
    this.nombre = nombre; 
    this.nacimiento = nacimiento;

  }
}
