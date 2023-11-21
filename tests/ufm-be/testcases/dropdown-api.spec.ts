import { test, expect } from '@playwright/test';
import testdata from '../testdata/dropdown-api.json';


test('dropdowms API ', async ({request }) => {
 // const bearertoken = await authToken.getBearerToken();
  const { token,apiBaseURLUFM} = process.env;
  const headersdata = {
    ...testdata.headers,
    "Authorization":`Bearer ${token}`
  }
  const responseData=await request.get(`${apiBaseURLUFM}${testdata.endpoint}`,{
    params:testdata.queryparams,
    headers:headersdata  
  })
  const responseBody = JSON.parse(await responseData.text());
  expect(responseBody).toMatchObject(testdata.expected_response);

});

test('test 1 @smoke @regression',async({request})=>{
  console.log("Smokea and regression testing")
})

test('test 2 @regression',async({request})=>{
  console.log("regression testing")
})

test('test 3 @smoke',async({request})=>{
  console.log("Smoke testing")
})

