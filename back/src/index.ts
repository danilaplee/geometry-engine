import { setCors } from './utils'
import { processPolygonBatch } from './polygons'

const { PubSub } = require('@google-cloud/pubsub');

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

exports.processPolygonPayloadSQS = async (req, res) => {
  setCors(req,res)
  try {
    console.info("processPolygonPayloadSQS req.body",req.body)
    const data = 
    typeof req.body === "string" 
      ? JSON.parse(req.body) 
      : req.body;

    if(data.payload) {
      const { polygons } = data.payload
      const pubSubClient = new PubSub();
      const dataBuffer = Buffer.from(JSON.stringify(data));
      const topicNameOrId = "polygon-batch"
      try {
        const messageId = await pubSubClient
          .topic(topicNameOrId)
          .publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published.`);
      } catch (error) {
        console.error(
          `Received error while publishing: ${error.message}`
        );
        return res.send({
          success:false, 
          error:error.message 
        })
      }

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

exports.processPolygonBatch = async (event, ctx, callback) => {
  console.info("processPolygonBatch", event)
  try {
    const data = JSON.parse(
      Buffer
      .from(event.data, 'base64')
      .toString()
    )
    const { polygons } = data.payload
    const result = processPolygonBatch(polygons)
    callback(null, result)

  } catch(err) {
    console.error(`process batch error: ${err.message}`)
    throw err.message
  }
}