export type clientKeysType =  'firstName' | 'lastName' | 'country';
export interface StyleClass {
  [name: string] : string
}
export interface InputFunc {
  (key: clientKeysType, value: string): void;
}
export interface GridFormProps {
  classes: StyleClass,
  clientKey: clientKeysType,
  value: string | number,
  inputChange: InputFunc
}