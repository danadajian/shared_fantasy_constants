import {
    retrieveObjectFromS3,
    uploadObjectToS3,
    publishToSnsTopic,
    createCloudWatchEvent,
    invokeLambdaFunction
} from './index';

import {S3, SNS, CloudWatchEvents, Lambda} from './aws';

jest.mock('./aws');

(S3.getObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Body: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

(S3.putObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(SNS.publish as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(CloudWatchEvents.putRule as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(CloudWatchEvents.putTargets as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

(Lambda.invoke as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Payload: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

describe('aws', () => {
    describe('retrieves object', () => {
        let result: any;
        beforeEach(async () => {
            result = await retrieveObjectFromS3('bucket', 'file.json');
        });

        it('should call getObject with correct params', () => {
            const params = {
                Bucket: "bucket",
                Key: 'file.json'
            };
            expect(S3.getObject).toHaveBeenCalledWith(params)
        });

        it('should retrieve object', () => {
            expect(result).toEqual({some: 'stuff'});
        });
    });

    describe('uploads object', () => {
        let result: any;
        const playerPool = ['player1', 'player2', 'player3'];
        beforeEach(async () => {
            result = await uploadObjectToS3(playerPool, 'bucket', 'file.json')
        });

        it('should call putObject with correct params', () => {
            const params = {
                Bucket: "bucket",
                Key: 'file.json',
                Body: JSON.stringify(playerPool)
            };
            expect(S3.putObject).toHaveBeenCalledWith(params)
        });
    });

    describe('publishes message to sns topic', () => {
        let result: any;
        const message = 'a message';

        beforeEach(async () => {
            result = await publishToSnsTopic(message, 'topic arn')
        });

        it('should call publish with correct params', () => {
            const params = {
                Message: message,
                TopicArn: 'topic arn'
            };
            expect(SNS.publish).toHaveBeenCalledWith(params)
        });
    });

    describe('creates cloudwatch event', () => {
        let result: any;
        const putRuleParams = 'rule params';
        const putTargetsParams = 'targets params';

        beforeEach(async () => {
            result = await createCloudWatchEvent(putRuleParams, putTargetsParams)
        });

        it('should call putRule with correct params', () => {
            expect(CloudWatchEvents.putRule).toHaveBeenCalledWith(putRuleParams)
        });

        it('should call putTargets with correct params', () => {
            expect(CloudWatchEvents.putTargets).toHaveBeenCalledWith(putTargetsParams)
        });
    });

    describe('invokes lambda function', () => {
        let result: any;
        beforeEach(async () => {
            result = await invokeLambdaFunction('function name', {some: 'payload'});
        });

        it("calls lambda invoke with correct params", () => {
            const params = {
                FunctionName: 'function name',
                Payload: JSON.stringify({some: 'payload'})
            };
            expect(Lambda.invoke).toHaveBeenCalledWith(params);
        });

        it('should return the expected result', () => {
            expect(result).toEqual({some: 'stuff'})
        });
    })
});
