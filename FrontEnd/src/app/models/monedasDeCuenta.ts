export class MonedasDeCuenta {
    
    idMoneda:number;
    nombre:string;
    unidades:number;
    saldoMoneda:number;

    constructor(idMoneda:number,unidades:number,saldoMoneda:number){
        this.idMoneda = idMoneda;
        if(idMoneda == 1){
            this.nombre = "Bitcoin"
        }
        else{
            this.nombre = "Otro"
        }
        this.unidades = unidades;
        this.saldoMoneda = saldoMoneda;
    }

    public setNombre(nombre: string){
        this.nombre = nombre;
    }

}
