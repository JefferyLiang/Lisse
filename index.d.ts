import {
  LisseApp as _LisseApp,
  LisseError as _LisseError,
  LisseSlot as _LisseSlot,
  LisseDatabaseSlot as _LisseDatabaseSlot
} from "./src/index";

declare namespace lisse {
  export class LisseApp extends _LisseApp {}
  export class LisseError extends _LisseError {}
  export abstract class LisseSlot extends _LisseSlot {}
  export abstract class LisseDatabaseSlot extends _LisseDatabaseSlot {}
  export function View(prefix: string): ClassDecorator;
  export function Get(path: string): MethodDecorator;
  export function Put(path: string): MethodDecorator;
  export function Post(path: string): MethodDecorator;
  export function Delete(path: string): MethodDecorator;
  export function Patch(path: string): MethodDecorator;
  export function Injectable(): ClassDecorator;
  export function Inject(): PropertyDecorator;
}

export = lisse;
