import 'reflect-metadata';
import { Methods } from './configs/Methods';
import { MetadataKeys } from './configs/MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function route(method: Methods) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const get = route(Methods.GET);
export const post = route(Methods.POST);
export const put = route(Methods.PUT);
export const patch = route(Methods.PARCH);
export const del = route(Methods.DELETE);
