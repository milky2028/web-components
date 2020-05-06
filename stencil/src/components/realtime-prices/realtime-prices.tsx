import {
  Component,
  Host,
  h,
  Prop,
  Element,
  EventEmitter,
  Event
} from '@stencil/core';
import createExcelBorder from './excelCellBorder';

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
  @Event() rowDataSorted: EventEmitter | null = null;

  @Prop() primaryColor = '';

  #originalRowData: any[] = [];
  @Prop({ mutable: true }) rowData: any[] = [];
  @Prop({ mutable: true }) tableHeaders: ColumnHeader[] = [];

  connectedCallback() {
    this.#originalRowData = this.rowData.slice();
    createExcelBorder();
  }

  #currentSorting: Record<string, SortDirection> | null = null;

  #findColumn = (headers: ColumnHeader[], key: string) => {
    return headers.find(({ field }) => field === key);
  };

  #sortRowData = (headers: ColumnHeader[], field: string) => {
    const sorter = (direction: SortDirection | null) => {
      this.rowDataSorted?.emit(`${field} sorted ${direction}`);
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

  #parseColumnAndRow = (key: string) => {
    const match = key.match(/col(\d+?)row(\d+?)/);
    return match ? { col: +match[1], row: +match[2] } : null;
  };

  #keyboardNavigation = (currentCell: string) => {
    const upArrow = 38;
    const downArrow = 40;
    const leftArrow = 37;
    const rightArrow = 39;

    return (keyEvent: KeyboardEvent) => {
      const cell = this.#parseColumnAndRow(currentCell);
      switch (keyEvent.keyCode) {
        case upArrow: {
          keyEvent.preventDefault();
          if (cell) {
            const oneUp = this.#rawCells[`col${cell.col}row${cell.row - 1}`];
            oneUp?.focus();
          }
          break;
        }
        case downArrow: {
          keyEvent.preventDefault();
          if (cell) {
            const oneDown = this.#rawCells[`col${cell.col}row${cell.row + 1}`];
            oneDown?.focus();
          }
          break;
        }
        case leftArrow: {
          keyEvent.preventDefault();
          if (cell) {
            const oneLeft = this.#rawCells[`col${cell.col - 1}row${cell.row}`];
            oneLeft?.focus();
          }
          break;
        }
        case rightArrow: {
          keyEvent.preventDefault();
          if (cell) {
            const oneRight = this.#rawCells[`col${cell.col + 1}row${cell.row}`];
            oneRight?.focus();
          }
          break;
        }
        default: {
          break;
        }
      }
    };
  };

  #generateColName = (columnNumber: number, rowNumber: number) => {
    return `col${columnNumber}row${rowNumber}`;
  };

  #applyNumericStyles = (value: any) => (isNaN(+value) ? '' : 'numeric-align');

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
        ).map(([_, value], c) => {
          const currentColName = this.#generateColName(c, r);
          return (
            <td
              ref={(el) => (this.#rawCells[currentColName] = el)}
              tabIndex={1}
              onKeyDown={this.#keyboardNavigation(currentColName)}
              style={{ width: `${100 / headers.length - 1}%` }}
              class={`cell ${this.#applyNumericStyles(value)}`}
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
          style={{ minWidth: `${this.tableHeaders.length * 100}px` }}
        >
          <thead>{this.#createHeaders(this.tableHeaders)}</thead>
          <tbody>
            {this.#createTableData(this.tableHeaders, this.rowData)}
          </tbody>
        </table>
      </Host>
    );
  }
}
