// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/',                          // parte de autenticação
  baseApiUrl: 'http://localhost:4200/api/'
              // todas as requisições serão direcionadas para a porta 4200 e
              // quando o node identificar o '/api'(que está no arquivo proxy.conf.json)
              // ele vai redirecionar para nossa aapi restfull
              
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
}
