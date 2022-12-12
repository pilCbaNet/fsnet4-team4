export class Operaciones {
    
    
    idMoneda:number;
    unidades:number;
    monto:number;
    idTipoOperacion:number;
    idCuenta:number;
    

    constructor(  idMoneda:number, unidades:number,monto:number,idTipoOperacion:number,idCuenta:number ){
        this.idMoneda = idMoneda;
        this.unidades = unidades;
        this.monto = monto;
        this.idTipoOperacion = idTipoOperacion;
        this.idCuenta = idCuenta;
    }
}