import { newE2EPage } from '@stencil/core/testing';

describe('realtime-prices', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<realtime-prices></realtime-prices>');

    const element = await page.find('realtime-prices');
    expect(element).toHaveClass('hydrated');
  });
});
