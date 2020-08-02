export declare const SUPPORTED_SPORTS: string[];
export declare const SUPPORTED_WEATHER_SPORTS: string[];
export declare const SUPPORTED_CONTESTS: string[];
export declare const LINEUP_RULES: any;
export declare function retrieveObjectFromS3 (bucketName: string, fileName: string): Promise<any>;
export declare function uploadObjectToS3 (object: any, bucketName: string, fileName: string): Promise<any>;
export declare function publishToSnsTopic (message: string, topicArn: string): Promise<any>;
export declare function createCloudWatchEvent (putRuleParams: any, putTargetsParams: any): Promise<any>;
export declare function invokeLambdaFunction (functionName: any, payload: any): Promise<any>;