export class Coin{

  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;

  constructor( name:string, symbol:string, image:string, current_price:number,price_change_percentage_24h: number,total_volume: number ){
    this.name=name;
    this.symbol=symbol;
    this.image=image;
    this.current_price=current_price,
    this.price_change_percentage_24h=price_change_percentage_24h,
    this.total_volume=total_volume;
}
}