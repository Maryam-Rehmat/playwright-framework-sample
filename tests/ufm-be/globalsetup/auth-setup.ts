import { test as setup, expect } from '@playwright/test';
import { Utility } from '../../common/fixtures/utils';


setup('authenticate', async ({ request }) => {
    console.log("testburst app : ",process.env.appName);
    process.env.token = await Utility.getTokenForUser('s0g0fhn',request);
});