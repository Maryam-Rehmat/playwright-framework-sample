import { test, expect } from '@playwright/test';
import testdatafile from '../testdata/historical-forecast.json';
import { json } from 'stream/consumers';

test.describe('validating the historical forecast service',() => {

    test('checking the list of historical forecast @Regression @smoke @gethistoricalforecast',async ({request}) => {

  const testdata = testdatafile;
  const { token, apiBaseURLUFM } = process.env;
  const headersdata = {
    "Authorization": `Bearer ${token}`
  }
  const endpointURL = `${apiBaseURLUFM}${testdata.endpoint}`
  console.log(endpointURL);
  const responseData=await request.get(endpointURL,{
    headers:headersdata,params: { "dim_id": testdata.dimensions.dim_id,"classification_id": testdata.dimensions.classification_id,"dim_val_id": testdata.dimensions.dim_val_id}  
  })
  const responseBody = JSON.parse(await responseData.text());
  console.log("historical Response : ")
  console.log(responseBody);

  console.log('name value is :')
  console.log(responseBody.row_data[0].name);
  const Hist_forecast_count=responseBody.row_data.length;
  console.log('length of array is :')
  console.log(Hist_forecast_count)
  //expect(responseBody.row_data[0].name).toContain(testdata.historical_Forecast_Name)

  //const responseBody1 = testdata.expected_response.row_data;
  //console.log(responseBody1)
  //const forcastNames: String[] = responseBody1.map((obj: any) => obj.name);
  //console.log(forcastNames)
  const forcastNames: String[] = responseBody.row_data.map((obj: any) => obj.name);
 //expect(forcastNames.find(x=>x.includes('OPTICAL'))).toContain(testdata.historical_Forecast_Name);
 //expect(responseBody.row_data.map(e => e.name)).toContain("OPTICAL");
 expect(forcastNames).toContain(testdata.historical_Forecast_Name);
  console.log('Historical forecast is of '+testdata.historical_Forecast_Name+' SBA type')

 if((Hist_forecast_count)==1){
  console.log('The historical forecast count is 1')
 }

 

        
    })
}
)