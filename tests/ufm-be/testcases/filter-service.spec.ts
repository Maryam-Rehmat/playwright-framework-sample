import { test, expect } from '@playwright/test';
import testdatafile from '../testdata/filter-service.json';

test.describe('@Regresion @Smoke @Filter Verify the filter API functionality', () => {
  test.describe.configure({ mode: 'serial' });
  let filter_id;

  const testdata = testdatafile;
  const { token, apiBaseURLUFM } = process.env;
  const headersdata = {
    "Authorization": `Bearer ${token}`
  }
  const endpointURL = `${apiBaseURLUFM}${testdata.endpoint}`
  console.log(endpointURL);

  test('If the user is able to save a new filter @saveFilter', async ({ request }) => {

     const createFilterResponse=await request.post(endpointURL,{
       headers:headersdata,
       data:testdata.filter_selection   
     })
     const createFilterResponseBody = JSON.parse(await createFilterResponse.text());
     console.log(createFilterResponseBody)
     expect(createFilterResponse).toBeOK();
  });

  test('If the user is able to see the saved filter @getFilter',async ({request}) => {
    const getFilterResponse = await request.get(endpointURL, {
      headers: headersdata,
      params: { "screen_id": testdata.filter_selection.screen_id }
    })
    expect(getFilterResponse).toBeOK();
    const getFilterResponseBody = JSON.parse(await getFilterResponse.text());
    console.log("Filter Response : ")
    console.log(getFilterResponseBody)

    getFilterResponseBody.forEach(filter => {
      let filterJson = JSON.parse(filter);
      
      if (filterJson.filter_name === testdata.filter_selection.filter_name) {
        console.log(`${filterJson.filter_name} is available`);
        filter_id = filterJson.filter_id;
      }
    });

    console.log(`Filter Id : ${filter_id}`);

  })


  test('If the user is able to delete the saved filter @deleteFilter',async ({request}) => {
    const delFilterResponse = await request.delete(endpointURL, {
      headers: headersdata,
      params: { "filter_id": filter_id }
    })
    expect(delFilterResponse).toBeOK();
    const delFilterResponseBody = JSON.parse(await delFilterResponse.text());
    console.log(delFilterResponseBody)

    const getFilterResponse = await request.get(endpointURL, {
      headers: headersdata,
      params: { "screen_id": testdata.filter_selection.screen_id }
    })
    const getFilterResponseBody = JSON.parse(await getFilterResponse.text());
    let flag = true;
    console.log("Available Filters after delete : ");
    getFilterResponseBody.forEach(filter => {
      let filterJson = JSON.parse(filter);
      console.log(filterJson.filter_name);
      
      if (filterJson.filter_name === testdata.filter_selection.filter_name) {
        flag=false;
      }
    });

    expect(flag).toBe(true);
  })


})




