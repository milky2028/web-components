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
  type?: 'string' | 'number' | 'boolean';
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
  /** This is a pointless @event rowDataSorted that lets the parent know when rowData has been sorted. */
  @Event() rowDataSorted: EventEmitter | null = null;

  /** An HTML or hex color string */
  @Prop() primaryColor = '';

  #originalRowData: any[] = [];
  @Prop({ mutable: true }) rowData: any[] = [];
  @Prop({ mutable: true }) tableHeaders: ColumnHeader[] = [];

  /** Runs each time the component is connected. Part of the web components spec. */
  connectedCallback() {
    this.#originalRowData = this.rowData.slice();
    createExcelBorder();
  }

  #currentSorting: Record<string, SortDirection> | null = null;

  /** 
    * Anything starting with a # uses the new ESM private class fields spec.
    * Nobody else likes that it uses # instead of the word private either.

    * In the context of web components though, true encapsulation is pretty important,
    * so keeping most data inaccessible to the parent is actually pretty important and a new feature in JS we should take advantage of.

    * Class methods cannot begin wigth #, so we just use arrow functions for every function so it can remain private.
    * These are compiled to WeakMaps. 
    */
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
          if (currentColumn?.type === 'number') {
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
            <th
              class="cell"
              /** The column is as wide as its title plus some padding. */
              style={{ minWidth: `${displayName.length + 10}ch` }}
            >
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

  #nagivateWithKeyboard = (currentCellName: string) => {
    const upArrow = 38;
    const downArrow = 40;
    const leftArrow = 37;
    const rightArrow = 39;

    return (keyEvent: KeyboardEvent) => {
      const cell = this.#parseColumnAndRow(currentCellName);
      /** If we're editing, the arrows are used to move between characters, not cells. */
      if (this.#isEditing) {
        const enterKey = 13;
        if (keyEvent.keyCode === enterKey) {
          const currentCell = this.#rawCells[currentCellName];
          if (currentCell) {
            /** Pressing enter exits editing mode and moves down one cell, matching behavior in Excel. */
            currentCell.contentEditable = 'false';
            this.#isEditing = false;
            if (cell) {
              const oneDown = this.#rawCells[
                `col${cell.col}row${cell.row + 1}`
              ];
              oneDown?.focus();
              /** We don't select text when moving cells. This is mostly to address a browser bug. */
              window.getSelection()?.removeAllRanges();
            }
          }
        }
      } else {
        switch (keyEvent.keyCode) {
          case upArrow: {
            keyEvent.preventDefault();
            if (cell) {
              const oneUp = this.#rawCells[`col${cell.col}row${cell.row - 1}`];
              oneUp?.focus();
              window.getSelection()?.removeAllRanges();
            }
            break;
          }
          case downArrow: {
            keyEvent.preventDefault();
            if (cell) {
              const oneDown = this.#rawCells[
                `col${cell.col}row${cell.row + 1}`
              ];
              oneDown?.focus();
              window.getSelection()?.removeAllRanges();
            }
            break;
          }
          case leftArrow: {
            keyEvent.preventDefault();
            if (cell) {
              const oneLeft = this.#rawCells[
                `col${cell.col - 1}row${cell.row}`
              ];
              oneLeft?.focus();
              window.getSelection()?.removeAllRanges();
            }
            break;
          }
          case rightArrow: {
            keyEvent.preventDefault();
            if (cell) {
              const oneRight = this.#rawCells[
                `col${cell.col + 1}row${cell.row}`
              ];
              oneRight?.focus();
              window.getSelection()?.removeAllRanges();
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    };
  };

  #enterEditingMode = (
    currentColumn: ColumnHeader | undefined,
    cellName: string
  ) => {
    return () => {
      if (currentColumn?.editable && !this.#isEditing) {
        const cell = this.#rawCells[cellName];
        if (cell) {
          this.#isEditing = true;
          /**

            * contenteditable is an html attribute that is used to make any element editable.
            * VSCode uses a textarea to make the DOM editable. I tried this method, but preferred contenteditable.
            * Titles in Google Docs use contenteditable.
           
           */
          cell.contentEditable = 'true';
          cell.focus();
        }
      }
    };
  };

  #updateRowData = (
    currentColumn: ColumnHeader | undefined,
    sourceRowIndex: number,
    cellName: string
  ) => {
    return () => {
      const cell = this.#rawCells[cellName];
      if (cell) {
        const value = cell.innerText;
        if (currentColumn) {
          const clonedRowData = [...this.rowData];
          clonedRowData[sourceRowIndex][currentColumn?.field] = value;
          this.rowData = clonedRowData;
        }
      }
    };
  };

  /** I spent a solid chunk of time trying to setup column names with Excel's A, AB, AAA naming scheme, but this turned out to be more readable in the long run. */
  #generateCellName = (columnNumber: number, rowNumber: number) => {
    return `col${columnNumber}row${rowNumber}`;
  };

  /** If data is missing from the source data object, fill it in to keep cells aligned. */
  #validateRow = (headers: string[], row: Record<string, any>) => {
    return Object.fromEntries(
      headers.map((field) => [field, row[field] ?? ''])
    );
  };

  #getCol = (headers: ColumnHeader[], field: string) => {
    return headers.find((col) => col.field === field);
  };

  #isEditing = false;
  /** #rawCells holds referencs to the raw cell HTML elements for every cell. We need this to be able to manipulate focus. */
  #rawCells: Record<string, HTMLTableCellElement | undefined> = {};
  #createTableData = (headers: ColumnHeader[], rowData: any[]) => {
    this.#rawCells = {};
    return rowData.map((row, rowIndex) => (
      <tr>
        {Object.entries(
          this.#validateRow(
            headers.map(({ field }) => field),
            row
          )
        ).map(([key, value], colIndex) => {
          const currentColumn = this.#getCol(headers, key);
          const cellName = this.#generateCellName(colIndex, rowIndex);
          return (
            <td
              ref={(el) => (this.#rawCells[cellName] = el)}
              tabIndex={1}
              onBlur={() => (this.#isEditing = false)}
              onKeyDown={this.#nagivateWithKeyboard(cellName)}
              onDblClick={this.#enterEditingMode(currentColumn, cellName)}
              onInput={this.#updateRowData(currentColumn, rowIndex, cellName)}
              /** align numbers to the right similar to excel */
              class={`cell ${
                currentColumn?.type === 'number' ? 'numeric-align' : ''
              }`}
            >
              {value}
            </td>
          );
        })}
      </tr>
    ));
  };

  /**
   * --primary-color is a CSS varaible that's used throughout the app.
   * We set this variable with JS from the inherited on the component itself.
   */
  #setupStyleVariables = () => {
    this.host.style.setProperty('--primary-color', this.primaryColor);
  };

  /**

    * This is the vdom render method.
    * This function runs every time a @Prop is changed.

    * Getters and setters are used to track @Prop changes.
    * A setter is run every time a value is set with =.
    * Since object types are passed by reference, changing the value of an object key will not cause a re-render.
    * Nor will pushing to an array.
    * The way to get around this is to use the spread operator when changing a value, which will trigger a re-render.
    * 
    * Example:
    * rowData = [...rowData, newItem]
    * instead of
    * rowData.push(newItem)
    * 
    * After a prop change is detected (there are lifecycle methods to know when this happens),
    * the render method is run and creates a virtualized representation of the DOM.
    * This virtualized representation of the DOM is compared against the actual DOM and any differences are applied, so that only the minimal amount of work is done.
   
   */
  render() {
    /** Make sure we apply CSS variables every render in case they've changed. */
    this.#setupStyleVariables();

    return (
      <Host>
        <h2 class="page-header">Realtime Prices</h2>
        <table>
          <thead>{this.#createHeaders(this.tableHeaders)}</thead>
          <tbody>
            {this.#createTableData(this.tableHeaders, this.rowData)}
          </tbody>
        </table>
      </Host>
    );
  }
}
