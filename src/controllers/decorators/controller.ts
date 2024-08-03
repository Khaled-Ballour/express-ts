import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './configs/Methods';
import { MetadataKeys } from './configs/MetadataKeys';
import { RequestHandler } from 'express';
import { getHandler } from './utils';

//target.prototype[key]
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.instance;

    Object.keys(target.prototype).forEach((key) => {
      const routeHandler = getHandler(
        Object.getOwnPropertyDescriptor(target.prototype, key) || {}
      );

      const path: string = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );

      const middlewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];

      if (path && method) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    });
  };
}
