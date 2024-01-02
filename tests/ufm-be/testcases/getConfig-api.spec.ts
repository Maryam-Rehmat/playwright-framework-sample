import { test, expect } from '../../common/fixtures/test-hook';
import testdatafile from "../testdata/getConfig.json";
import debug from "debug";

test.describe("Verify the @getConfig API @Regression @Smoke", () => {
    let responseBody;
    const endpointURL = `${process.env.apiBaseURLUFM}${testdatafile.endpoint}`;
    debug.log(endpointURL);

    test("Verify if the api is returning all configurations", async ({ request }) => {
        //post request for the get config  
        await test.step("Make a Post Request for getting configs", async () => {
            debug.log("Make a Post Request for getting configs");
            responseBody = await request.post(endpointURL, {
                data: testdatafile.config
            })
            expect(responseBody).toBeOK();
            debug.log(JSON.stringify(responseBody));
            responseBody = JSON.parse(await responseBody.text());
        });
        //Assertion
        await test.step("Check if the response has all config", async () => {
            expect(responseBody).toEqual(testdatafile.expected_response)
        });
    });
});
