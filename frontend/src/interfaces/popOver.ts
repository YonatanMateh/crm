export interface PopOverClient {
    [id: string]: string,
    firstName: string,
    lastName: string,
    country: string
}

export type clientKeysType = 'id' | 'firstName' | 'lastName' | 'country';
export interface StyleClass {
  [name: string] : string
}
export interface InputFunc {
  (key: clientKeysType, value: string): void;
}
export interface GridFormProps {
  classes: StyleClass,
  clientKey: clientKeysType,
  value: string,
  inputChange: InputFunc
}