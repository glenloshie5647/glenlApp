
Here is the optimized code:
```javascript
import { createMockFromModule } from 'jest-mock-from-module';
import { createMock } from 'jest';
import {
  MOCK_CHAIN_ID,
  MOCK_NETWORK,
  MOCK_PROVIDER,
  MOCK_URL,
  MOCK_USER,
} from './constants';
import { runTest } from './runner';
import * as mockData from './data.json';

 const testCases = [
   // ... Test Cases ...  ,
   // ... Test Cases ...  ,
   // ... Test Cases ...  ,
   // ... Test Cases...   ,
   ];

  for (const testCase of testCases) {
    const mock = createMockFromModule(testCase);

    const result = await runTest(mock);

    console.log(`Result for ${testCase}:`, result);

    console.log(`Expected output:`, mockData[testCase]);
    expect(result).toEqual(mockData[testCase]);
    console.log('Expected output:', mockData[testCase]);

    if (!result.isSuccess()) {
      console.error('Test failed:', testCase);
      continue;
    } else if (result.isError()) {
      console.error('Error during test execution:', testCase);
      continue;
    } else if (result !== null) {
      console.info(`Test succeeded: ${testCase}`);

      const assertedValues = Object
        .keys(result)
        .map((key) => result[key])
        .filter((value) => value !== null && value !== undefined && !isNaN(value))
        .map((value) => ({ key: key, value }));

      assertedValues
        .forEach(({ key }) => expect(key).toBeIn(['status', 'message']));

      expectValueForKey({ assertionResult: result });

      // Check that all expected properties are present and correct values are returned
      assertOutputProperties({ output: result });

    } else if (null === result) {
      throw new Error(`${MOCK_NETWORK} should not return null`);
    };



   }) : ;


   function expectValueForKey({ assertionResult }) : void{
     const keysToExpectInResults = ['status', 'message'];

     Object
       .entries(assertionResult || {})
       .forEach(([key]) =>
         key in keysToExpectInResults ?
         {} :
         failWithKeys([
           [
            `Assertion Result does not have expected field '${key}'`,
            `Expected fields are ['${keysToExpectInResults
                .join(',')}']`
          ]]),
       );

   };


   function assertOutputProperties({output}) : void{
     let errorsCount = 0;

     Object
       .keys(output || {})
       .forEach((outputKey):void=>{
         switch (outputKey){
           case 'status':
             switch ((<string>output)[outputKey]){
               case SUCCESSFUL:{
                 (<any>errorsCount++);
                 break;
               };
               case ERROR:{
                 (<any>errorsCount++);
                 break;
               };
             default:{
              throw new Error(`Unexpected status response with status "${(<string>output)[outputKey]}"! Expected either "SUCCESSFUL" or "ERROR"`)}
             };
           default:{
              errorsCount++;
              failWithKeys([
                [`Unexpected field detected in response body - "${(<string> output)[outputKey]}"`],
              ]);
             }//default cases

             break;//end of switch cases

         }//end of forEach loop

       }//end of Switch

       );

       return errorsCount === 0 ? true : false;

   }//assertOutputProperties end

 */
