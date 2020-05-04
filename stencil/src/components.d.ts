/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ColumnHeader, } from "./components/realtime-prices/realtime-prices";
export namespace Components {
    interface MatIcon {
        "clickable": boolean;
    }
    interface StencilCounter {
        "count": number;
    }
    interface StencilHello {
    }
    interface StencilRealtimePrices {
        "primaryColor": string;
        "rowData": any[];
        "tableHeaders": ColumnHeader[];
    }
}
declare global {
    interface HTMLMatIconElement extends Components.MatIcon, HTMLStencilElement {
    }
    var HTMLMatIconElement: {
        prototype: HTMLMatIconElement;
        new (): HTMLMatIconElement;
    };
    interface HTMLStencilCounterElement extends Components.StencilCounter, HTMLStencilElement {
    }
    var HTMLStencilCounterElement: {
        prototype: HTMLStencilCounterElement;
        new (): HTMLStencilCounterElement;
    };
    interface HTMLStencilHelloElement extends Components.StencilHello, HTMLStencilElement {
    }
    var HTMLStencilHelloElement: {
        prototype: HTMLStencilHelloElement;
        new (): HTMLStencilHelloElement;
    };
    interface HTMLStencilRealtimePricesElement extends Components.StencilRealtimePrices, HTMLStencilElement {
    }
    var HTMLStencilRealtimePricesElement: {
        prototype: HTMLStencilRealtimePricesElement;
        new (): HTMLStencilRealtimePricesElement;
    };
    interface HTMLElementTagNameMap {
        "mat-icon": HTMLMatIconElement;
        "stencil-counter": HTMLStencilCounterElement;
        "stencil-hello": HTMLStencilHelloElement;
        "stencil-realtime-prices": HTMLStencilRealtimePricesElement;
    }
}
declare namespace LocalJSX {
    interface MatIcon {
        "clickable"?: boolean;
        "onIconClick"?: (event: CustomEvent<any>) => void;
    }
    interface StencilCounter {
        "count"?: number;
    }
    interface StencilHello {
    }
    interface StencilRealtimePrices {
        "onRowDataSorted"?: (event: CustomEvent<any>) => void;
        "primaryColor"?: string;
        "rowData"?: any[];
        "tableHeaders"?: ColumnHeader[];
    }
    interface IntrinsicElements {
        "mat-icon": MatIcon;
        "stencil-counter": StencilCounter;
        "stencil-hello": StencilHello;
        "stencil-realtime-prices": StencilRealtimePrices;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mat-icon": LocalJSX.MatIcon & JSXBase.HTMLAttributes<HTMLMatIconElement>;
            "stencil-counter": LocalJSX.StencilCounter & JSXBase.HTMLAttributes<HTMLStencilCounterElement>;
            "stencil-hello": LocalJSX.StencilHello & JSXBase.HTMLAttributes<HTMLStencilHelloElement>;
            "stencil-realtime-prices": LocalJSX.StencilRealtimePrices & JSXBase.HTMLAttributes<HTMLStencilRealtimePricesElement>;
        }
    }
}
