import { AbstractEntity } from '../../../../abstractEntity';
import { ReferenceLink, ReferenceLinkType } from '../../referenceLink';
import { ProductPrices, ProductPricesType } from './prices/productPrices';

export enum OrderProductsFields {
  COLUMN_SKU = 'sku',
  COLUMN_QUANTITY = 'quantity',
  COLUMN_STATUS = 'status',
  COLUMN_DATESTATUS = 'dateStatus',
  COLUMN_DETAILEDSTATUS = 'detailedStatus',
  COLUMN_IS_ADDON = 'isAddon',
  COLUMN_ARROWSUBCATEGORIES = 'arrowSubCategories',
  COLUMN_IS_TRIAL = 'isTrial',
  COLUMN_PRICES = 'prices',
  COLUMN_SUBSCRIPTION = 'subscription',
  COLUMN_LICENSE = 'license',
}

export type OrderProductsType = {
  [OrderProductsFields.COLUMN_SKU]: string;
  [OrderProductsFields.COLUMN_QUANTITY]: number;
  [OrderProductsFields.COLUMN_STATUS]: string;
  [OrderProductsFields.COLUMN_DATESTATUS]: string;
  [OrderProductsFields.COLUMN_DETAILEDSTATUS]: string;
  [OrderProductsFields.COLUMN_IS_ADDON]: boolean;
  [OrderProductsFields.COLUMN_ARROWSUBCATEGORIES]?: Array<string>;
  [OrderProductsFields.COLUMN_IS_TRIAL]: boolean;
  [OrderProductsFields.COLUMN_PRICES]: ProductPricesType;
  [OrderProductsFields.COLUMN_SUBSCRIPTION]: ReferenceLinkType;
  [OrderProductsFields.COLUMN_LICENSE]: ReferenceLinkType;
};

export class OrderProduct extends AbstractEntity<OrderProductsType> {
  readonly #sku: string;
  readonly #quantity: number;
  readonly #status: string;
  readonly #dateStatus: string;
  readonly #detailedStatus: string;
  readonly #isAddon: boolean;
  readonly #arrowSubCategories?: Array<string>;
  readonly #isTrial: boolean;
  readonly #prices: ProductPrices;
  readonly #subscription: ReferenceLink;
  readonly #license: ReferenceLink;

  public constructor(getOrderProducts: OrderProductsType) {
    super(getOrderProducts);

    this.#sku = getOrderProducts[OrderProductsFields.COLUMN_SKU];
    this.#quantity = getOrderProducts[OrderProductsFields.COLUMN_QUANTITY];
    this.#status = getOrderProducts[OrderProductsFields.COLUMN_STATUS];
    this.#dateStatus = getOrderProducts[OrderProductsFields.COLUMN_DATESTATUS];
    this.#detailedStatus =
      getOrderProducts[OrderProductsFields.COLUMN_DETAILEDSTATUS];
    this.#isAddon = getOrderProducts[OrderProductsFields.COLUMN_IS_ADDON];
    this.#arrowSubCategories =
      getOrderProducts[OrderProductsFields.COLUMN_ARROWSUBCATEGORIES] ??
      undefined;
    this.#isTrial = getOrderProducts[OrderProductsFields.COLUMN_IS_TRIAL];
    this.#prices = new ProductPrices(
      getOrderProducts[OrderProductsFields.COLUMN_PRICES],
    );
    this.#subscription = new ReferenceLink(
      getOrderProducts[OrderProductsFields.COLUMN_SUBSCRIPTION],
    );
    this.#license = new ReferenceLink(
      getOrderProducts[OrderProductsFields.COLUMN_LICENSE],
    );
  }

  get sku(): string {
    return this.#sku;
  }
  get quantity(): number {
    return this.#quantity;
  }
  get status(): string {
    return this.#status;
  }
  get dateStatus(): string {
    return this.#dateStatus;
  }
  get detailedStatus(): string {
    return this.#detailedStatus;
  }
  get isAddon(): boolean {
    return this.#isAddon;
  }
  get arrowSubCategories(): Array<string> | undefined {
    return this.#arrowSubCategories;
  }
  get isTrial(): boolean {
    return this.#isTrial;
  }
  get prices(): ProductPrices {
    return this.#prices;
  }
  get subscription(): ReferenceLink {
    return this.#subscription;
  }
  get license(): ReferenceLink {
    return this.#license;
  }

  public toJSON(): OrderProductsType {
    return {
      [OrderProductsFields.COLUMN_SKU]: this.sku,
      [OrderProductsFields.COLUMN_QUANTITY]: this.quantity,
      [OrderProductsFields.COLUMN_STATUS]: this.status,
      [OrderProductsFields.COLUMN_DATESTATUS]: this.dateStatus,
      [OrderProductsFields.COLUMN_DETAILEDSTATUS]: this.detailedStatus,
      [OrderProductsFields.COLUMN_IS_ADDON]: this.isAddon,
      [OrderProductsFields.COLUMN_ARROWSUBCATEGORIES]: this.arrowSubCategories,
      [OrderProductsFields.COLUMN_IS_TRIAL]: this.isTrial,
      [OrderProductsFields.COLUMN_PRICES]: this.prices.toJSON(),
      [OrderProductsFields.COLUMN_SUBSCRIPTION]: this.subscription.toJSON(),
      [OrderProductsFields.COLUMN_LICENSE]: this.license.toJSON(),
    };
  }
}
