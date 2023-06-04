export interface DataItem {
  ConsumedQuantity: string;
  Cost: string;
  Date: string;
  InstanceId: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  Tags: {
    [key: string]: string;
  };
  UnitOfMeasure: string;
  Location: string;
  ServiceName: string;
}
