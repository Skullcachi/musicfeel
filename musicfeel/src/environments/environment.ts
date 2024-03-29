// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* APIEndpoint: 'http://localhost:3000/', */
  CRUDAPIEndPoint: 'musicfeel-publico-1048611273.us-east-2.elb.amazonaws.com:80/',
  WeatherAPIEndPoint: 'musicfeel-publico-1048611273.us-east-2.elb.amazonaws.com:88/',
  RekognitionCRUDAPIEndPoint: 'musicfeel-publico-1048611273.us-east-2.elb.amazonaws.com:8000/',
  FileUploadCRUDAPIEndPoint: 'musicfeel-publico-1048611273.us-east-2.elb.amazonaws.com:8888/',
  //APIEndpoint: 'http://ec2-52-14-238-78.us-east-2.compute.amazonaws.com:3000/',
  /* CRUDAPIEndpoint: 'http://ec2-52-14-238-78.us-east-2.compute.amazonaws.com:3000/',
  RekognitionAPIEndpoint: 'http://ec2-52-14-238-78.us-east-2.compute.amazonaws.com:3000/',
  fileUploadAPIEndpoint: 'http://ec2-52-14-238-78.us-east-2.compute.amazonaws.com:3000/',*/
  SpotifyAPIEndpoint: 'http://musicfeel-frontend.s3-website.us-east-2.amazonaws.com:4200/'
  /* SpotifyAPIEndpoint: 'http://ec2-52-14-238-78.us-east-2.compute.amazonaws.com:4200/' */
  /* SpotifyAPIEndpoint: 'http://localhost:4200/' */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
