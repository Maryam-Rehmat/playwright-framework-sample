import { test, expect } from '@playwright/test';
import testdata from '../testdata/filter-service.json';

test.describe('@Regresion @Smoke @Filter Verify the filter API functionality', () => {
  test.describe.configure({ mode: 'serial' });

  // variable used to store the filter id and use it across the tests under this describe
  let filter_id;

  // API endpoint URL
  const endpointURL = `${process.env.apiBaseURLUFM}${testdata.endpoint}`
  console.log(endpointURL);

  test('If the user is able to save a new filter @saveFilter', async ({ context }) => {

    //post request for saving the filter
    const createFilterResponse = await context.request.post(endpointURL, {
      data: testdata.filter_selection
    })
    const createFilterResponseBody = await createFilterResponse.json();
    console.log(createFilterResponseBody)

    //Assertion
    expect(createFilterResponse).toBeOK();
    expect(createFilterResponseBody).toEqual(testdata.success_message)
  });

  test('If the user is not able to save the same filter again @saveFilter', async ({ context }) => {

    //post request for saving the filter
    const createFilterResponse = await context.request.post(endpointURL, {
      data: testdata.filter_selection
    })
    const createFilterResponseBody = await createFilterResponse.json();
    console.log(createFilterResponseBody)

    //Assertion
    expect(createFilterResponse).toBeOK();
    expect(createFilterResponseBody).toEqual(testdata.duplicate_filter_name_response)
  });

  test('If the user is able to see the saved filter @getFilter', async ({ request }) => {

    //get request to fetch the available filters
    const getFilterResponse = await request.get(endpointURL, {
      params: { "screen_id": testdata.filter_selection.screen_id }
    })
    expect(getFilterResponse).toBeOK();

    const getFilterResponseBody = await getFilterResponse.json();

    console.log("Filter Response : ")
    console.log(getFilterResponseBody)

    //extracting the filter names from the response into an Array
    const filterNames: String[] = getFilterResponseBody.map((obj: any) => obj.filter_name);
    //Assertion
    expect(filterNames).toContain(testdata.filter_selection.filter_name);

    //Extracting the Filter ID that has been created and storing it in the filter_id to use it in other testcases
    getFilterResponseBody.forEach(filterJson => {
      if (filterJson.filter_name === testdata.filter_selection.filter_name) {
        filter_id = filterJson.filter_id;
      }
    });
    console.log(`Filter Id : ${filter_id}`);

  })


  test('If the user is able to delete the saved filter @deleteFilter', async ({ request }) => {

    // delete request to delete the filter
    const delFilterResponse = await request.delete(endpointURL, {
      params: { "filter_id": filter_id }
    })

    // request assertion
    expect(delFilterResponse).toBeOK();
    const delFilterResponseBody = await delFilterResponse.json();
    expect(delFilterResponseBody).toEqual(testdata.delete_message)

    // Make sure the filter deleted successfully by checking the get filters call
    const getFilterResponse = await request.get(endpointURL, {
      params: { "screen_id": testdata.filter_selection.screen_id }
    })
    const getFilterResponseBody = await getFilterResponse.json();
    console.log("Available Filters after delete : ");
    console.log(getFilterResponseBody)

    // Checking the filterId is not present in the filters
    const filter_ids: String[] = getFilterResponseBody.map((obj: any) => obj.filter_id);
    expect(filter_ids).not.toContain(filter_id);

  })


})



