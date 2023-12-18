import { test, expect } from '@playwright/test';
import testdatafile from '../testdata/screenDetails.json';
import debug from 'debug';

test.describe('Validating the screen Details API',()=>{

    const testdata = testdatafile.configEndpoint;
     const { token,apiBaseURLUFM} = process.env;
     const headersdata = {
       "Authorization":`Bearer ${token}`
     }
    test('Checking the screen Details API response @Regresion @Smoke @screenDetails', async ({request }) => 
    {
        //get request for the screen details
        await test.step('Make a Get Request for screen Details', async () => {
          debug.log('Make a Get Request for screen Details');

     const endpointURL=`${apiBaseURLUFM}${testdata.endpoint}`;
     console.log(endpointURL);
     const responseData=await request.get(endpointURL,
        {
       headers:headersdata  
        }
    )
     const responseBody = JSON.parse(await responseData.text());
     console.log("responseBody",responseBody)

     //Assertion
    await test.step('Check Api response is equal to the testdata ', async () => {
        expect(responseBody).toMatchObject(testdata.expected_response);
      })
     
   });  
   
    })
})



