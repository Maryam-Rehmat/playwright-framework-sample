import { test, expect } from '@playwright/test';
import testdatafile from '../testdata/metadata-service.json';

test.describe('Validating the metadata service',()=>{

  test('Checking the dimension config response @Regresion @Smoke @getdimensionconfig', async ({request }) => {
    // const bearertoken = await authToken.getBearerToken();
    const testdata = testdatafile.configEndpoint;
     const { token,apiBaseURLUFM} = process.env;
     const headersdata = {
       "Authorization":`Bearer ${token}`
     }
     console.log(`${apiBaseURLUFM}${testdata.endpoint}`);
     const responseData=await request.get(`${apiBaseURLUFM}${testdata.endpoint}`,{
       headers:headersdata  
     })
     const responseBody = JSON.parse(await responseData.text());
     expect(responseBody).toMatchObject(testdata.expected_response);
   
   });

   testdatafile.dimensionEndpoint.forEach(testdata => {
    test('Checking the dimension response for '+testdata.name+' @Regresion @Smoke @getdimensionconfig', async ({request }) => {
     
      const { token,apiBaseURLUFM} = process.env;
      const headersdata = {
        "Authorization":`Bearer ${token}`
      }
      console.log(`${apiBaseURLUFM}${testdata.endpoint}`);
      const responseData=await request.post(`${apiBaseURLUFM}${testdata.endpoint}`,{
        headers:headersdata,  
        data:testdata.payload
      })
      const responseBody = JSON.parse(await responseData.text());
      expect(responseBody).toMatchObject(testdata.expected_response);
    
    });
   })
   
   
})




