export class usuario {

    idUsuario:number;
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    password: string;
    fechaNacimiento: Date;
    fechaAlta: Date;
    idCuenta: number;





    constructor(idUsuario:number,nombre: string, apellido: string, email: string, password1: string, dni: number, fechanacimiento: Date,fechaAlta: Date,idCuenta: number) {
        this.idUsuario = idUsuario; 
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.password = password1;
        this.fechaNacimiento = fechanacimiento;
        this.fechaAlta=fechaAlta;
        this.idCuenta=idCuenta;

    }

}