export class MonedasDeCuenta {
    
    nombre:string;
    unidades:number;
    saldoMoneda:number;

    constructor(nombre:string,unidades:number,saldoMoneda:number){
        this.nombre= nombre;
        this.unidades = unidades;
        this.saldoMoneda = saldoMoneda;
    }

}
