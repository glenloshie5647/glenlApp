Okay, I need to optimize the given test code. Let me look at what it's doing right now. The test imports some mock data and then has a series of expect statements checking each element in the quoteDataRows array.

I notice that each expect is repeating the same structure: for index 0, it checks aggId and amountReceiving; same for index 1, 2, etc. This repetition can be streamlined.

Maybe I can loop through each item in quoteDataRows using a forEach loop. That way, I don't have to write separate expects for each index. But wait, how do I handle both aggId and amountReceiving in one loop?

Each object has an id (like Agg1) and an amount (like '100 DAI'). If I create an array of expected values corresponding to each index, I can map them together.

So I'll create an array called expectedValues where each element is an object with aggId and amountReceiving matching the expected values. Then, using forEach with both the current quoteDataRow and its index, I can check against these expected values.

This approach reduces multiple lines of expects into a single loop with two assertions inside. It makes the code cleaner and easier to maintain if more test cases are added later.

I should also make sure that variable names are clear but concise to keep things readable without being too verbose.

Putting it all together: import the data as before; describe block remains; within it(), map out expectedValues; then forEach over quoteDataRows alongside their indexes to run expects on both properties simultaneously.
</think>

import q from './mock-quote-data';

describe('quoteData', () => {
  it('matches expectations', () => {
    const e = [
      {id:'Agg1',amt:'100 DAI'},
      {id:'Agg2',amt:'101 DAI'},
      {id:'Agg3',amt:'102 DAI'},
      {id:'Agg4',amt:'150 DAI'},
      {id:'Agg5',amt:'104 DAI'},
      {id:'Agg6',amt:'105 DAI'}
    ];
    q.forEach((v,i)=>{expect(v).toEqual(e[i]);});
  });
});
