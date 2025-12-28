export type AllCodeType = "ROLE" | "POSITION" | "PRICE" | "PAYMENT" | "PROVINCE" | "TIME" |"STATUS" ;

export interface AllCodes {
  id: number;
  keyMap: string;
  type: AllCodeType;
  value: string ;
}
