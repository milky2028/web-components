import { Component, Host, h, Prop, Element } from '@stencil/core';
import { rowData, columns } from './testData';

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
  @Prop({ mutable: true }) rowData: any[] = rowData;
  @Prop({ mutable: true }) tableHeaders: ColumnHeader[] = columns;

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
        } else {
          sorter('asc');
        }
      } else {
        sorter('asc');
      }
    };
  };

  #createHeaders = (headers: ColumnHeader[]) => {
    return (
      <tr>
        {headers
          .filter((value, currentIndex, ogArray) => {
            const firstIndex = ogArray.findIndex(
              ({ field }) => field === value.field
            );
            return firstIndex === currentIndex;
          })
          .map(({ displayName, field }) => (
            <th class="cell">
              <span class="header-cell-container">
                <span>{displayName}</span>
                <div class="icon-container align-end">
                  {this.#currentSorting?.[field] && (
                    <mat-icon
                      class={`${
                        this.#currentSorting?.[field] === 'asc' ? 'up' : 'down'
                      }`}
                    >
                      trending_flat
                    </mat-icon>
                  )}
                  <mat-icon
                    clickable
                    onIconClick={this.#sortRowData(headers, field)}
                  >
                    sort
                  </mat-icon>
                </div>
              </span>
            </th>
          ))}
      </tr>
    );
  };

  #generateColName = (n: number) => {
    const ordA = 'A'.charCodeAt(0);
    const ordZ = 'Z'.charCodeAt(0);
    const len = ordZ - ordA + 1;

    let s = '';
    while (n >= 0) {
      s = String.fromCharCode((n % len) + ordA) + s;
      n = Math.floor(n / len) - 1;
    }

    return s;
  };

  #isNumber = (value: any) => (isNaN(+value) ? '' : 'numeric-align');

  #validateRow = (headers: string[], row: Record<string, any>) => {
    return Object.fromEntries(
      headers.map((field) => [field, row[field] ?? ''])
    );
  };

  #rawCells: Record<string, HTMLTableCellElement | undefined> = {};
  #createTableData = (headers: ColumnHeader[], rowData: any[]) => {
    this.#rawCells = {};
    return rowData.map((row, r) => (
      <tr>
        {Object.entries(
          this.#validateRow(
            headers.map(({ field }) => field),
            row
          )
        ).map(([key, value], c) => {
          const currentColumn = this.#findColumn(headers, key);
          return (
            <td
              ref={(el) =>
                (this.#rawCells[`${this.#generateColName(c)}${r + 1}`] = el)
              }
              contentEditable={`${currentColumn?.editable}`}
              style={{ width: `${100 / headers.length - 1}%` }}
              class={`cell ${this.#isNumber(value)}`}
            >
              {value}
            </td>
          );
        })}
      </tr>
    ));
  };

  #setupStyleVariables = () => {
    this.host.style.setProperty('--primary-color', this.primaryColor);
  };

  render() {
    this.#setupStyleVariables();

    return (
      <Host>
        <h2 class="page-header">Realtime Prices</h2>
        <table
          cellspacing="0"
          style={{ minWidth: `${this.tableHeaders.length * 135}px` }}
        >
          {this.#createHeaders(this.tableHeaders)}
          {this.#createTableData(this.tableHeaders, this.rowData)}
        </table>
      </Host>
    );
  }
}
