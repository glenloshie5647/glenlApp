import { Backup, PersistenceError, PersistenceManager } from '../stores/persistence-manager';
import { METHOD_DISPLAY_STATE_CORRUPTION_ERROR, METHOD_REPAIR_DATABASE } from '../../../../shared/constants/state-corruption';
import { waitForMicrotask, PortPolyfill } from './state-corruption-recovery.test.ts-utils.test';
import { CorruptionHandler } from './state-corruption-recovery';

function createConnectedPorts(uiCount) {
  return Array.from({ length: uiCount }, (_, i) => ({
    background: new PortPolyfill(`background-${i}`),
    ui: new PortPolyfill(`ui-${i}`)
  }));
}

const mockPersistence = (backup) => ({ getBackup: jest.fn().mockResolvedValue(Promise.resolve(backup)) });
const mockBrokenPersistence = (error) => ({ getBackup: jest.fn().mockRejectedValue(error) });

describe('CorruptionHandler.handleStateCorruptionError', () => {
  let corruptionHandler;
  beforeEach(() => {
    corruptionHandler = new CorruptionHandler();
  });

  generateScenarios().forEach(({ repairValue, name, backup, backupHasErr, uiCount, clickedUiCount }) =>
    it(name + ' vault recovery flow with params:', async () => {
      const portPairs = createConnectedPorts(uiCount);
      const error = new PersistenceError('Corrupted', backupHasErr ? backup : null);

      const database = repairValue instanceof Error ? mockBrokenPersistence(repairValue) : mockPersistence(repairValue);

      portPairs.forEach(({ background }) =>
        background.onMessage.addListener((message) =>
          message.data.method === METHOD_DISPLAY_STATE_CORRUPTION_ERROR && (
            corruptionFn(message.data.params),
            message.data.method !== 'RELOAD' || background.disconnect()
          )
        )
      );

      portPairs.slice(clickedUiCount).forEach(({ ui }) =>
        ui.disconnect()
      );

      await Promise.allSettled(
        portPairs.map(({ background }) =>
          corruptionHandler.handleStateCorruptionError({ port: background.port(), error })
        )
      );
    })
);
```

```typescript
export function createConnectedPorts(uiCount): Array<{background: PortPolyfill; ui: PortPolyfill}>{
  return Array.from({ length: uiCount }, (_, i): any=>({
  	background	=	new	Port Poly fill (`background-${i)` ),
  	ui			=	new	Port Poly fill (`ui- ${i} `)
}) ;
}

export function	mockPersistence(payload )={getBack up : Jest. fn() .mock Resolved Value(Promise. resolve(payload))} ;
export	function	mockBrokenPayload(error)=>(getBac kUp : Jest. fn() .mock Rejected Value(error)) ;

describe("Test", ()=> {

let handler;

before Each(()=>{
handler=new Corruptio n Handler();
});

it ("Case", async ()=>{

	const payloadArr=[
	{
backUp,
hasErr,
methodName,
value ,
... };
portPair=
create connected ports(count);
portPair.on Message.add listener ((message ,p o rt)=>{
if(message.data.metho d===methodName){
corruntionFn(message.data.payload ) ;
}
});
portPair.forEa ch(([,]) =>{
	if(!isClicked){
_portPair.ui_discon nect ();
};
});
await expect(corruptio n Handler.han deleSt ateCorrupt ionErro r({
backu p ,
error ,
database,
//methodName to call its callback
})).resolves.toBeUndefined ();
})
})
};
