import { Component, Host, h, Prop, Element } from '@stencil/core';

export interface ColumnHeader {
  displayName: string;
  field: string;
  editable?: boolean;
  sortType: 'string' | 'number';
}

type SortDirection = 'asc' | 'desc';

@Component({
  tag: 'stencil-realtime-prices',
  styleUrl: 'realtime-prices.css',
  shadow: true
})
export class RealtimePrices {
  // @ts-ignore
  @Element() host: HTMLElement;

  @Prop() primaryColor = '';

  #originalRowData: any[] = [];
  @Prop({ mutable: true }) rowData: any[] = [
    {
      productLoanX: 'LXJim',
      issuer: 'Jim',
      bidPrice: 101,
      offerPrice: 210
    },
    {
      bidPrice: 190,
      productLoanX: 'LXLarry',
      issuer: 'Larry',
      offerPrice: 210
    },
    { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 }
  ];

  @Prop({ mutable: true }) tableHeaders: ColumnHeader[] = [
    {
      displayName: 'LoanX',
      field: 'productLoanX',
      sortType: 'string'
    },
    {
      displayName: 'Issuer',
      field: 'issuer',
      sortType: 'string'
    },
    {
      displayName: 'Bid Price',
      field: 'bidPrice',
      sortType: 'number',
      editable: true
    },
    {
      displayName: 'Offer Price',
      field: 'offerPrice',
      sortType: 'number',
      editable: true
    }
  ];

  connectedCallback() {
    this.#originalRowData = this.rowData.slice();
  }

  #currentSorting: Record<string, SortDirection> | null = null;

  #findColumn = (headers: ColumnHeader[], key: string) => {
    return headers.find(({ field }) => field === key);
  };

  #sortRowData = (headers: ColumnHeader[], field: string) => {
    const sorter = (direction: SortDirection | null) => {
      if (!direction) {
        this.#currentSorting = null;
        this.rowData = this.#originalRowData.slice();
      } else {
        this.#currentSorting = { [field]: direction };
        const currentColumn = this.#findColumn(headers, field);
        this.rowData = this.rowData.slice().sort((a, b) => {
          if (currentColumn?.sortType === 'number') {
            return direction === 'asc'
              ? a[field] - b[field]
              : b[field] - a[field];
          } else {
            const stringA = String(a[field]);
            const stringB = String(b[field]);
            return direction === 'asc'
              ? stringA.localeCompare(stringB)
              : stringB.localeCompare(stringA);
          }
        });
      }
    };

    return () => {
      if (this.#currentSorting) {
        if (this.#currentSorting[field]) {
          if (this.#currentSorting[field] === 'desc') {
            sorter(null);
          } else {
            sorter('desc');
          }
        }
      } else {
        sorter('asc');
      }
    };
  };

  #createHeaders = (headers: ColumnHeader[]) => {
    return (
      <tr>
        {headers.map(({ displayName, field }) => (
          <th class="cell" onDblClick={this.#sortRowData(headers, field)}>
            <span class="header-cell-container">
              <span>{displayName}</span>
            </span>
          </th>
        ))}
      </tr>
    );
  };

  #isNumber = (value: any) => (isNaN(+value) ? '' : 'numeric-align');

  #validateRow = (headers: string[], row: Record<string, any>) => {
    return Object.fromEntries(
      headers.map((field) => [field, row[field] ?? ''])
    );
  };

  #createTableData = (headers: ColumnHeader[], rowData: any[]) =>
    rowData.map((row) => (
      <tr>
        {Object.entries(
          this.#validateRow(
            headers.map(({ field }) => field),
            row
          )
        )
          .sort(([aKey], [bKey]) => {
            const aIndex = this.tableHeaders.findIndex(
              ({ field }) => field === aKey
            );

            const bIndex = this.tableHeaders.findIndex(
              ({ field }) => field === bKey
            );

            return aIndex - bIndex;
          })
          .map(([key, value]) => {
            const currentColumn = this.#findColumn(headers, key);
            return (
              <td
                contentEditable={`${currentColumn?.editable}`}
                class={`cell ${this.#isNumber(value)}`}
              >
                {value}
              </td>
            );
          })}
      </tr>
    ));

  #setupStyleVariables = () => {
    this.host.style.setProperty('--primary-color', this.primaryColor);
  };

  render() {
    this.#setupStyleVariables();

    return (
      <Host>
        <h2 class="page-header">Realtime Prices</h2>
        <table cellspacing="0">
          {this.#createHeaders(this.tableHeaders)}
          {this.#createTableData(this.tableHeaders, this.rowData)}
        </table>
      </Host>
    );
  }
}
