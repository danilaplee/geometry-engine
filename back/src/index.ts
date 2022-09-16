import { setCors } from './utils'
import { processPolygonBatch } from './polygons'

exports.processPolygonPayload = async (req, res) => {
  setCors(req,res)
  try {
    console.info("processPolygonPayload req.body",req.body)
    const data = 
    typeof req.body === "string" 
      ? JSON.parse(req.body) 
      : req.body;

    if(data.payload) {
      const { polygons } = data.payload
      const result = await processPolygonBatch(polygons)
      console.info(result)
      return res.send(result)
    }
  } catch(err) {
    console.error("err", err)
    return res.send({
      success:false, 
      error:err.message 
    })
  }

  return res.send({ success: true })  
}