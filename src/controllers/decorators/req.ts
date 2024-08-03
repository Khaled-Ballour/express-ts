import 'reflect-metadata';
import { MetadataKeys } from './configs/MetadataKeys';
export function req() {
  return function (target: any, key: string, index: number) {
    const reqParams: number[] =
      Reflect.getOwnMetadata(MetadataKeys.REQ, target, key) || [];
    reqParams.push(index);
    Reflect.defineMetadata(MetadataKeys.REQ, reqParams, target, key);
  };
}
