import { InfluxDB, WritePrecision, Point } from '@influxdata/influxdb-client'
require('dotenv').config()

const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG
const bucket = process.env.INFLUX_BUCKET

const influxClient = new InfluxDB({ url: 'https://us-west-2-1.aws.cloud2.influxdata.com', token: token })

export interface SearchEntry {
  tags: {
    status: 'success' | 'failed';
    method: 'search' | 'nowplaying' | 'autosearch';
  };
  fields: {
    query: string;
    songTitle: string;
    songArtist: string;
    totalTime: number;
  };
  time: Date;
}

export async function logSearches (data: SearchEntry): Promise<void> {
  if (!token || !org || !bucket) return

  const writeApi = influxClient.getWriteApi(org, bucket, WritePrecision.ms)

  const record = new Point('search')
  record.tag('method', data.tags.method)
  record.tag('status', data.tags.status)

  record.stringField('query', data.fields.query)
  record.stringField('songTitle', data.fields.songTitle)
  record.stringField('songArtist', data.fields.songArtist)
  record.stringField('totalTime', data.fields.totalTime)

  record.timestamp(data.time)

  writeApi.writeRecord(record.toString())
  writeApi.close()
}
