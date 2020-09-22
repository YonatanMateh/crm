export type clientKeysType =  'firstName' | 'lastName' | 'country';
export interface InputFunc {
  (key: string, value: string): void;
}
export interface GridFormProps {
  inputKey: string,
  value: string | number,
  textColor: string,
  inputChange: InputFunc
}