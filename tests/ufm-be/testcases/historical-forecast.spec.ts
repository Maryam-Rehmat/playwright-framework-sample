import { test, expect } from '@playwright/test';
import testdatafile from '../testdata/historical-forecast.json';
import debug from 'debug';


testdatafile.sba_datas.forEach(sba_date =>{
  test.describe('Validation of @HistForecast @Regression @smoke', () => {

   //declaring test data
    let testdata = testdatafile;

    //declaring valriable globally to use in test
    let responseBody,forcastNames,hist_forecast_count;

   // API endpoint URL
   const endpointURL = `${process.env.apiBaseURLUFM}${testdata.endpoint}`
   debug.log(endpointURL);

   //Fetch the historical forecasts and verify the SBA type
    test('Check the list of historical forecast for '+sba_date.forecastname, async ({ context }) => {
   
     await test.step('Make a Get Request for list of submitted forecast of SBA ', async () => {
        debug.log('fetch the list of Historical forecasts');

        // Get call for the historical forecast names
        let responseData=await context.request.get(endpointURL,{
          params: { "dim_id": sba_date.queryParams.dim_id,"classification_id": sba_date.queryParams.classification_id,"dim_val_id": sba_date.queryParams.dim_val_id}  
        })        
         responseBody = await responseData.json();   
     })

      //fetching the historical forecast names   
      await test.step('Check if the expected sba name with the actual', async () => {
       debug.log('Check the SBA Name in Historical forecast')

       //identify the historical forecast names using the key 'name' from the list of object array
       forcastNames = responseBody.row_data.map((obj: any) => obj.name);

       //Using ForeEach loop iterating all the forecasts available in Historical forecast list
        forcastNames.forEach((forecast:string)=>{
         debug.log('Previously Submitted Forecast name is :'+forecast)
  
         //Validating the expected sba name with the actual
         expect(forecast).toContain(sba_date.forecastname);
         debug.log('Historical forecast is of '+sba_date.forecastname+' SBA type')
        }) 
      })
    }); 

   test('validate the list @count for '+sba_date.forecastname, async ({ context }) => {
      //Fetching the count of Historical forecasts
      await test.step('Verify the count of historical forecast', async () => {
  
        //Making a get call to fetch the list of avaialable historical forecasts
         let responseData=await context.request.get(endpointURL,{
         params: { "dim_id": sba_date.queryParams.dim_id,"classification_id": sba_date.queryParams.classification_id,"dim_val_id": sba_date.queryParams.dim_val_id}  
        })

        //Convering the response into JSON 
        responseBody = await responseData.json();

        //Using length method,getting the length/count of the historical forecasts
        hist_forecast_count=responseBody.row_data.length;
        debug.log('Number of Forecasts already submitted and showing in Historical forecast section is :'+hist_forecast_count);
      });

      //Verifying the count to be 12
      await test.step('Verify the count of historical forecast', async () => {
       if((hist_forecast_count)==12){
         debug.log('The historical forecast count is 12')
        }else{
         expect(hist_forecast_count).toEqual(12);
         debug.log('The historical forecast count is not 12')
        }
      })
       
    })
    
  })
 
})
