import { expect } from "@playwright/test";
import debug from "debug";
import forecastData from '../testdata/forecast-api.json'


export class UfmUtility {

  // This method will create the scenario and asserts the response
  static async createForecast(lobName, request) {

    //Making the get call to create forecast
    const endpointURL = `${process.env.apiBaseURLUFM}${forecastData.endpoint}`;
    debug.log(endpointURL);
    const response = await request.post(
      endpointURL,

      { data: forecastData.createForecastPayloads[lobName] }
    );
    //asserting the response
    expect(response).toBeOK();
    let responseBody = await response.json();
    expect(responseBody.message).toEqual(forecastData.createSuccessMessage)
    debug.log(JSON.stringify(responseBody));

    //returning the scenario Id of the created forecast
    return responseBody.scenario.scenario_id;
  }

  // This method will delete the sceanrio and asserts the response
  static async deleteForecast(scenario_ID, request) {
    const endpointURL = `${process.env.apiBaseURLUFM}${forecastData.endpoint}${scenario_ID}`;
    debug.log(endpointURL);
    //call delete API
    const response = await request.delete(endpointURL);
   
    //asserting the response
    expect(response).toBeOK();
    let responseBody = await response.json();

    //adding the sceanrio id to the expecetd message
    let message = forecastData.deleteMessage.replace('scenario_id',scenario_ID);

    //Asserting the message
    expect(responseBody.message).toEqual(message)
    debug.log(JSON.stringify(responseBody));

    //returning the scenario ID
    return scenario_ID;
  }
}
