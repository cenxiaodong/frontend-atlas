// vite-plugin-eslint.d.ts
declare module 'vite-plugin-eslint' {
  import { Plugin } from 'vite';

  interface Options {
    include?: string | string[];
    exclude?: string | string[];
    failOnError?: boolean;
    failOnWarning?: boolean;
    lintOnStart?: boolean;
    emitError?: boolean;
    emitWarning?: boolean;
    cache?: boolean;
    fix?: boolean;
    formatter?: string | ((errors: any) => string);
  }

  function eslint(options?: Options): Plugin;
  export default eslint;
}
