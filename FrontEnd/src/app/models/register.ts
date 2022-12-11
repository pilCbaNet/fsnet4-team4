export class Register {
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  password: string;
  fechaNacimiento: Date;
  
  
  

  constructor(nombre: string,apellido:string,email: string, password1: string,dni: number,fechanacimiento: Date) {
    this.nombre = nombre; 
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.password = password1;
    this.fechaNacimiento = fechanacimiento;

  }
}
