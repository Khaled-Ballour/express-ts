import { Request, Response, NextFunction } from 'express';
import { MetadataKeys } from '../configs/MetadataKeys';

export function injectRequest(
  target: any,
  key: string,
  desc: PropertyDescriptor
) {
  const method: Function = desc.value;
  desc.value = function (
    req: Request,
    res: Response,
    next: NextFunction,
    ...args: any[]
  ) {
    const reqParams: number[] =
      Reflect.getOwnMetadata(MetadataKeys.REQ, target, key) || [];
    const updatedArgs = [...args];
    reqParams.forEach((index) => {
      updatedArgs.splice(index, 0, req);
    });
    return method.apply(this, [req, res, next, ...updatedArgs]);
  };
}
