import debug from 'debug';
import { test, expect } from '../../common/fixtures/test-hook';
import testdatafile from '../testdata/metadata-service.json';

test.describe('Validating the metadata service',()=>{

  test('Checking the dimension config response @Regression @Smoke @getdimensionconfig', async ({request }) => {
    // const bearertoken = await authToken.getBearerToken();
    const testdata = testdatafile.configEndpoint;
     const { token,apiBaseURLUFM} = process.env;
     const headersdata = {
       "Authorization":`Bearer ${token}`
     }
     const endpointURL=`${apiBaseURLUFM}${testdata.endpoint}`;
     debug.log(endpointURL);
     const responseData=await request.get(endpointURL,{
       headers:headersdata  
     })
     const responseBody = JSON.parse(await responseData.text());
     debug.log(responseBody)
     expect(responseBody).toMatchObject(testdata.expected_response);
   
   });

  //  commented out the following testcase as the API was deprecated
  //  testdatafile.dimensionEndpoint.forEach(testdata => {
  //   test('Checking the dimension response for '+testdata.name+' @Regresion @Smoke @getdimensionconfig', async ({request }) => {
     
  //     const { token,apiBaseURLUFM} = process.env;
  //     const headersdata = {
  //       "Authorization":`Bearer ${token}`
  //     }
  //     const endpointURL=`${apiBaseURLUFM}${testdata.endpoint}`;
  //     console.log(endpointURL);
  //     const responseData=await request.post(endpointURL,{
  //       headers:headersdata,  
  //       data:testdata.payload
  //     })
  //     const responseBody = JSON.parse(await responseData.text());
  //     expect(responseBody).toMatchObject(testdata.expected_response);
    
  //   });
  //  })
   
   
})




