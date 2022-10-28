export class Cuenta
{
    operacion:string;
    moneda:string;
    unidades:number;
    importeArs:number;
    fecha:string;
    hashOperacion:number;

    constructor( operacion:string, moneda:string,unidades:number,importeArs:number,fecha:string, hashOperacion:number ){
        this.operacion = operacion;
        this.moneda = moneda;
        this.unidades=unidades;
        this.importeArs = importeArs
        this.fecha = fecha;
        this.hashOperacion = hashOperacion;
    }
}

