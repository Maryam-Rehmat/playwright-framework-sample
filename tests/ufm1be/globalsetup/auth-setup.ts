import { test as setup, expect } from '@playwright/test';
import loginData from '../testdata/LoginData.json'

setup('authenticate', async ({ request }) => {
     const authURL = process.env.authTokenURL
     const responseBody = await request.post(`${authURL}`,{
        data : loginData.user1
    })
    const token = (await responseBody.json()).token;
    process.env.token = token;
});