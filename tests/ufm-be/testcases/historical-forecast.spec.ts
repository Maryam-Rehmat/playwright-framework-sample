import testdatafile from '../testdata/historical-forecast.json';
import {test,	expect} from '../../common/fixtures/test-hook';
import debug from 'debug';




testdatafile.sba_datas.forEach(sba_date => {
	test.describe('Validation of @HistForecast @Regression @smoke', () => {

		//declaring test data
		let testdata = testdatafile;

		//declaring valriable globally to use in test
		
		let responseData, responseBody, forcastNames, hist_forecast_count;
		const{test,beforeEach}=require('@playwright/test');

		test.beforeEach(async(responseBody) => {			
		  });

		// API endpoint URL
		const endpointURL = `${process.env.apiBaseURLUFM}${testdata.endpoint}`
		debug.log(endpointURL);

		//Fetch the historical forecasts and verify the SBA type
		test('Check the list of historical forecast for ' + sba_date.forecastname, async ({
			context
		}) => {

			await test.step('Make a Get Request for list of submitted forecast of SBA '+ sba_date.forecastname, async () => {
				debug.log('fetch the list of Historical forecasts');

				// Get call for the historical forecast names
				 responseData = await context.request.get(endpointURL, {
					params: {
						"dim_id": sba_date.queryParams.dim_id,
						"classification_id": sba_date.queryParams.classification_id,
						"dim_val_id": sba_date.queryParams.dim_val_id
					}
				})
				responseBody = await responseData.json();
			})

			//fetching the historical forecast names   
			await test.step('Check if all the Historical forecast name contains '+sba_date.forecastname, async () => {
				debug.log('Check the SBA Name '+sba_date.forecastname+' in Historical forecast')

				//identify the historical forecast names using the key 'name' from the list of object array
				forcastNames = responseBody.row_data.map((obj: any) => obj.name);

				//Using ForeEach loop iterating all the forecasts available in Historical forecast list
				forcastNames.forEach((forecast: string) => {
					debug.log('Previously Submitted Forecast name is :' + forecast)

					//Validating the expected sba name contains in historical forecast
					expect(forecast).toContain(sba_date.forecastname);
					debug.log('Historical forecast is of ' + sba_date.forecastname + ' SBA type')
				})
			})
		});

		test('validate the list @count for ' + sba_date.forecastname, async ({
			context
		}) => {
			//Fetching the count of Historical forecasts
			await test.step('Verify the count of historical forecast of '+ sba_date.forecastname, async () => {

				//Making a get call to fetch the list of avaialable historical forecasts
				 responseData = await context.request.get(endpointURL, {
					params: {
						"dim_id": sba_date.queryParams.dim_id,
						"classification_id": sba_date.queryParams.classification_id,
						"dim_val_id": sba_date.queryParams.dim_val_id
					}
				})

				//Convering the response into JSON 
				responseBody = await responseData.json();

				//Using length method,getting the length/count of the historical forecasts
        //test.beforeEach(responseBody);
				hist_forecast_count = responseBody.row_data.length;
				debug.log('Number of Forecasts already submitted and showing in Historical forecast section is :' + hist_forecast_count);
			});

			//Verifying the count of total historical forecast to be 12
			await test.step('Verify the count of historical forecast', async () => {
				if ((hist_forecast_count) == testdata.forecast_count) {
					debug.log('The historical forecast count is '+testdata.forecast_count)
				}
				else {
					expect(hist_forecast_count).toEqual(testdata.forecast_count);
					debug.log('The historical forecast count is not '+testdata.forecast_count)
				}
			})

		})

	})

})

function beforeEach(arg0: () => Promise<void>) {
	throw new Error('Function not implemented.');
}
