'use strict';
const geometric = require("geometric");


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

export const processPolygonBatch = async (polygons:PolygonItem[]) => {
  
  const processed = polygons.map(poly=>{
    const p = poly.polygon.points
    poly.totalPoints = p.length
    poly.area = geometric.polygonArea(p.map(i=>[i.x, i.y]))
    return poly
  })
  
  const categorySet = processed.reduce((a, i)=>{
    if(a[i.category]){
      a[i.category].area += i.area
      a[i.category].items.push(i)
    }
    else {
      a[i.category] = {
        name:i.category,
        area:i.area, 
        items:[i]
      }
    }
    return a
  }, {})

  const sortedCategorySet = Object.keys(categorySet).map(i=>{
    return categorySet[i]
  }).sort((a,b)=>b.area-a.area)

  return {
    sortedCategorySet
  }
}