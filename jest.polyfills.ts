/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

import { Blob } from 'buffer';
import { fetch, Headers, Request, Response } from 'undici';
import { TextDecoder, TextEncoder } from 'util';

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  Blob: { value: Blob },
  fetch: { value: fetch, writable: true },
  Headers: { value: Headers, writable: true },
  Request: { value: Request, writable: true },
  Response: { value: Response, writable: true },
});
