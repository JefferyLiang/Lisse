import { LisseApp as _LisseApp, LisseError as _LisseError } from "./src/index";

declare namespace lisse {
  export class LisseApp extends _LisseApp {}
  export class LisseError extends _LisseError {}
  export function View(prefix: string): ClassDecorator;
  export function Get(path: string): MethodDecorator;
  export function Put(path: string): MethodDecorator;
  export function Post(path: string): MethodDecorator;
  export function Delete(path: string): MethodDecorator;
  export function Patch(path: string): MethodDecorator;
  export function Service(): ClassDecorator;
  export function Injectable(...args: string[]): ClassDecorator;
}

export = lisse;
