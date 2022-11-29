export class Cuenta
{
    operacion:string;
    moneda:string;
    unidades:number;
    importeArs:number;
    fecha:string;
    

    constructor( operacion:string, moneda:string,unidades:number,importeArs:number,fecha:string ){
        this.operacion = operacion;
        this.moneda = moneda;
        this.unidades=unidades;
        this.importeArs = importeArs
        this.fecha = fecha;
        
    }
}

