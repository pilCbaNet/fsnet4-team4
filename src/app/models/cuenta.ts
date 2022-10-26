export class Cuenta
{
    operacion:string;
    fecha:string;
    monto:number;

    constructor( operacion:string, fecha:string,monto:number ){
        this.operacion = operacion;
        this.fecha = fecha;
        this.monto = monto;
    }
}