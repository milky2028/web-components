import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-realtime-prices',
  styleUrl: 'realtime-prices.css',
  shadow: true
})
export class RealtimePrices {
  @Prop() loans: any[] = [
    { bidPrice: 100, productLoanX: 'LX15526', offerPrice: 250 },
    { productLoanX: 'LX15526', bidPrice: 100, offerPrice: 250 },
    { productLoanX: 'LX15526', bidPrice: 100, offerPrice: 250 }
  ];

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

  #isNumber = (value: any) => (isNaN(+value) ? '' : 'numeric-align');

  render() {
    const MatIcon = (props: { classes?: string[] }, children: any[]) => (
      <div class={`mat-icon ${props.classes?.join(' ')}`}>{children}</div>
    );

    return (
      <Host>
        <h2 class="page-header">
          <span>Realtime Prices</span>
          <MatIcon classes={['brightness-icon', 'align-end']}>
            brightness_medium
          </MatIcon>
        </h2>
        <table cellspacing="0">
          <tr>
            {this.#tableHeaders.map(({ displayName }) => (
              <th class="cell table-header">
                <span class="header-cell-container">
                  <span>{displayName}</span>
                  <MatIcon classes={['align-end']}>menu</MatIcon>
                </span>
              </th>
            ))}
          </tr>
          {this.loans.map((loan) => (
            <tr>
              {Object.entries(loan)
                .sort(([aKey], [bKey]) => {
                  const aIndex = this.#tableHeaders.findIndex(
                    ({ field }) => field === aKey
                  );

                  const bIndex = this.#tableHeaders.findIndex(
                    ({ field }) => field === bKey
                  );

                  return aIndex - bIndex;
                })
                .map(([_, value]) => (
                  <td contentEditable class={`cell ${this.#isNumber(value)}`}>
                    {value}
                  </td>
                ))}
            </tr>
          ))}
        </table>
      </Host>
    );
  }
}
