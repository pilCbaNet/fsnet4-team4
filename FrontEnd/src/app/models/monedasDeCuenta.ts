export class MonedasDeCuenta {
    
    idCuenta:number;
    idMoneda:number;
    unidades:number;
    saldoMoneda:number;

    constructor(idCuenta:number,idMoneda:number,unidades:number,saldoMoneda:number){
        this.idCuenta = idCuenta;
        this.idMoneda = idMoneda;
        this.unidades = unidades;
        this.saldoMoneda = saldoMoneda;
    }



}
