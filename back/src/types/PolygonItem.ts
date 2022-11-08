export interface PolygonItem {
  author:string;
  category:string;
  area?:number;
  totalPoints?:number;
  polygon:{
    points:{
      x:number;
      y:number;
    }[]
  }
}