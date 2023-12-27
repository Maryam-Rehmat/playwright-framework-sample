import { test, expect } from "@playwright/test";
import testdatafile from "../testdata/baseline.json";
//import { test, expect } from '../../common/fixtures/test-hook'
import debug from "debug";

test.describe("Validating the baseline forecast Details on basis of Primary Flag API@Regresion @Smoke @baseline", () => 
{
  let apiResponse,apiResponseBody,forcastNames;
  const testdata = testdatafile.configEndpoint;
  const endpointURL = `${process.env.apiBaseURLUFM}${testdata.endpoint}`;
  debug.log(endpointURL);  

  test("Checking the baseline Details includes Primary forecast when Primary flag is true ", async ({ context }) => {
    //get request for the baseline details when primary is true
    await test.step("Make a Get Request for baseline Details when primary is true", async () => {
      debug.log("Make a Get Request for baseline Details when primary is true");
      const apiResponse = await context.request.get(endpointURL,{params: {
                "dim_id": testdata.sba_datas.queryParams.dim_id,
                "classification_id": testdata.sba_datas.queryParams.classification_id,
                "dim_val_id":testdata.sba_datas.queryParams.dim_val_id,
                "include_primary":testdata.sba_datas.queryParams.include_primary}});
      apiResponseBody = await apiResponse.json();
    });
    //Assertion
    await test.step("Check Api response is equal to the testdata ", async () => {
      expect(apiResponseBody).toMatchObject(testdata.expected_response);
                //identify the baseline forecast names using the key 'name' from the list of object array
                forcastNames = apiResponseBody.row_data.map((obj: any) => obj.name);
                console.log('Forecast names is : ' + forcastNames)
                //Using ForeEach loop iterating all the forecasts available in Historical forecast list
                forcastNames.forEach((forecast: string) => {
                //Validating the expected sba name contains in Primary forecast
                    expect(forcastNames).toContain(testdata.forecast_name);  
                });
  });
});
test("Checking the baseline Details does not include Primary forecast when Primary flag is false ", async ({ context }) => {
    //get request for the baseline details when primary is false
    await test.step("Make a Get Request for baseline Details when primary is false", async () => {
      debug.log("Make a Get Request for baseline Details when primary is false");
      const apiResponse = await context.request.get(endpointURL,{params: {
                "dim_id": testdata.sba_datas.queryParams.dim_id,
                "classification_id": testdata.sba_datas.queryParams.classification_id,
                "dim_val_id":testdata.sba_datas.queryParams.dim_val_id,
                "include_primary":testdata.sba_datas.include_primary}});
      apiResponseBody = await apiResponse.json();
    });
    //Assertion
    await test.step("Check Api response is equal to the testdata ", async () => {
                //identify the baseline forecast names using the key 'name' from the list of object array
                forcastNames = apiResponseBody.row_data.map((obj: any) => obj.name);
                console.log('Forecast names is : ' + forcastNames)
                //Using ForeEach loop iterating all the forecasts available in Historical forecast list
                forcastNames.forEach((forecast: string) => {
                //Validating the expected sba name contains in Primary forecast
                expect(forcastNames).not.toContain(testdata.forecast_name);  
                });
  });
});
});
