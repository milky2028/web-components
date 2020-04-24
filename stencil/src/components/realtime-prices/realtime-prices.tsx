import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-realtime-prices',
  styleUrl: 'realtime-prices.css',
  shadow: true
})
export class RealtimePrices {
  @Prop() primaryColor = '';
  @Prop({ mutable: true }) theme: 'light' | 'dark' = 'light';
  @Prop() loans: any[] = [];

  constructor() {}

  #tableHeaders = [
    {
      displayName: 'LoanX',
      field: 'productLoanX'
    },
    {
      displayName: 'Bid Price',
      field: 'bidPrice'
    },
    {
      displayName: 'Offer Price',
      field: 'offerPrice'
    }
  ];

  render() {
    const MatIcon = (props: { classes?: string[] }, children: any[]) => (
      <div class={`mat-icon ${props.classes?.join(' ')}`}>{children}</div>
    );

    return (
      <Host>
        <MatIcon classes={['brightness-icon']}>brightness_medium</MatIcon>
        <h2>Realtime Prices</h2>
        <table>
          <tr>
            {this.#tableHeaders.map(({ displayName }) => (
              <td class="table-header">{displayName}</td>
            ))}
          </tr>
          {this.loans.map((loan) => {
            return Object.entries(loan);
          })}
        </table>
      </Host>
    );
  }
}
