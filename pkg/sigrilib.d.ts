/* tslint:disable */
/* eslint-disable */
/**
* @param {string} filename
* @returns {string}
*/
export function add_stuff(filename: string): string;
/**
* @param {string} filename
* @returns {string}
*/
export function get_config(filename: string): string;
/**
* @param {string} config
* @returns {string}
*/
export function js_start(config: string): string;
/**
* @param {string} filename
* @param {string} outfilename
*/
export function start_simul_from_file(filename: string, outfilename: string): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly add_stuff: (a: number, b: number, c: number) => void;
  readonly get_config: (a: number, b: number, c: number) => void;
  readonly js_start: (a: number, b: number, c: number) => void;
  readonly start_simul_from_file: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
