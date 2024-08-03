import 'reflect-metadata';
import { MetadataKeys } from './configs/MetadataKeys';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, middlewares, target, key);
  };
}
