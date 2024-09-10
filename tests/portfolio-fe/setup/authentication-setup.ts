import { test as setup, expect } from '../../common/fixtures/test-hook'
import { Utility } from '../../common/fixtures/utils';

setup('authenticate for portfolio users', async ({ request }) => {
    process.env.token = await Utility.getTokenForUser('vn501a8', request);
});
