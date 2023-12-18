import { test, expect } from '@playwright/test';
import testdatafile from '../testdata/historical-forecast.json';
import debug from 'debug';

let testdata = testdatafile;
testdatafile.sba_datas.forEach(sba_date =>{
  test.describe('Validation of @Historical_Forecast @Regression @smoke', () => {
   let responseBody,forecast;
  
  // API endpoint URL
  const endpointURL = `${process.env.apiBaseURLUFM}${testdata.endpoint}`
  debug.log(endpointURL);

  test('the list of historical forecast for @Forecastname', async ({ context }) => {
    //Get call for the historical forecast names
    await test.step('Make a Get Request for list of Historical forecast of SBA '+sba_date.forecastname, async () => {
      debug.log('Make a Get Request for list of Historical forecast of SBA '+sba_date.forecastname);
  let responseData=await context.request.get(endpointURL,{
    data: { "dim_id": sba_date.queryParams.dim_id,"classification_id": sba_date.queryParams.classification_id,"dim_val_id": sba_date.queryParams.dim_val_id}  
  })
  let responseBody = JSON.parse(await responseData.text());
  debug.log("historical Response : "+responseBody)
})
  //});

// test('check the name for @SBA', async ({ context }) => {

  //fetching the historical forecast names 
  await test.step('Check if the expected sba name with the actual', async () => {
    debug.log('Check the SBA Name in Historical forecast date')
  let forcastNames = responseBody.row_data.map((obj: any) => obj.name);
  forcastNames.forEach((forecast:string)=>{
  debug.log('Previously Submitted Forecast name is :'+forecast)
  })
  //Validating the expected sba name with the actual
 expect(forecast).toContain(sba_date.forecastname);
 debug.log('Historical forecast is of '+sba_date.forecastname+' SBA type')
}
)
//});
 

//test('validate the list @count', async ({ context }) => {
//Fetchingthe count of Historical forecasts
await test.step('Verify the count of historical forecast', async () => {
let Hist_forecast_count=responseBody.row_data.length;
  debug.log('Number of Forecasts already submitted and showing in Historical forecast section is :'+Hist_forecast_count);
 if((Hist_forecast_count)==12){
  debug.log('The historical forecast count is 12')
 }else{
  expect(Hist_forecast_count).toEqual(12);
  debug.log('The historical forecast count is not 12')
 }}
)
}
);
})})
