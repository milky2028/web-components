import { ColumnHeader } from './realtime-prices';

const rowData = [
  {
    productLoanX: 'LXJim',
    issuer: 'Jim',
    bidPrice: 101,
    offerPrice: 210
  },
  {
    bidPrice: 190,
    issuer: 'Larry',
    offerPrice: 210,
    productLoanX: 'LXLarry'
  },
  { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 },
  {
    productLoanX: 'LXJim',
    issuer: 'Jim',
    bidPrice: 101,
    offerPrice: 210
  },
  {
    bidPrice: 190,
    issuer: 'Larry',
    offerPrice: 210,
    productLoanX: 'LXLarry'
  },
  { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 },
  {
    productLoanX: 'LXJim',
    issuer: 'Jim',
    bidPrice: 101,
    offerPrice: 210
  },
  {
    bidPrice: 190,
    issuer: 'Larry',
    offerPrice: 210,
    productLoanX: 'LXLarry'
  },
  { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 },
  {
    productLoanX: 'LXJim',
    issuer: 'Jim',
    bidPrice: 101,
    offerPrice: 210
  },
  {
    bidPrice: 190,
    issuer: 'Larry',
    offerPrice: 210,
    productLoanX: 'LXLarry'
  },
  { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 },
  {
    productLoanX: 'LXJim',
    issuer: 'Jim',
    bidPrice: 101,
    offerPrice: 210
  },
  {
    bidPrice: 190,
    issuer: 'Larry',
    offerPrice: 210,
    productLoanX: 'LXLarry'
  },
  { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 },
  {
    productLoanX: 'LXJim',
    issuer: 'Jim',
    bidPrice: 101,
    offerPrice: 210
  },
  {
    bidPrice: 190,
    issuer: 'Larry',
    offerPrice: 210,
    productLoanX: 'LXLarry'
  },
  { productLoanX: 'LXAdam', issuer: 'Adam', bidPrice: 105, offerPrice: 240 }
];

const columns: ColumnHeader[] = [
  {
    displayName: 'LoanX',
    field: 'productLoanX',
    sortType: 'string'
  },
  {
    displayName: 'LoanX2',
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
  },
  {
    displayName: 'Offer Price',
    field: 'offer3434Price',
    sortType: 'number',
    editable: true
  },
  {
    displayName: 'LoanX',
    field: 'productHelloLoanX',
    sortType: 'string'
  },
  {
    displayName: 'Issuer',
    field: 'issuerPeople',
    sortType: 'string'
  },
  {
    displayName: 'Bid Price',
    field: 'bidPeoplPrice',
    sortType: 'number',
    editable: true
  },
  {
    displayName: 'Offer Price',
    field: 'offerPrSomethingice',
    sortType: 'number',
    editable: true
  },
  {
    displayName: 'LoanX',
    field: 'productLPepepoanX',
    sortType: 'string'
  },
  {
    displayName: 'Issuer',
    field: 'issuDoodleer',
    sortType: 'string'
  },
  {
    displayName: 'Bid Price',
    field: 'bidPDaveyrice',
    sortType: 'number',
    editable: true
  },
  {
    displayName: 'Offer Price',
    field: 'offerPMaryrice',
    sortType: 'number',
    editable: true
  }
];

export { rowData, columns };
