import { newSpecPage } from '@stencil/core/testing';
import { RealtimePrices } from './realtime-prices';

describe('realtime-prices', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RealtimePrices],
      html: `<realtime-prices></realtime-prices>`,
    });
    expect(page.root).toEqualHtml(`
      <realtime-prices>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </realtime-prices>
    `);
  });
});
