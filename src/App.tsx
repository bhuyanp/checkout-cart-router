import { useState } from 'react'
import './App.css'


function getRandomNumber(max: number, min: number) {
  return Math.round(Math.random() * (max - min) + min);
}

const getIntialCartLineUp = (): number[][] => {
  let counters: number[][] = [[]];
  for (let i = 0; i < getRandomNumber(7, 3); i++) {
    let queue: number[] = [];
    for (let j = 0; j < getRandomNumber(5, 0); j++) {
      queue[j] = getRandomNumber(15, 0);
    }
    counters[i] = queue;
  }
  return counters;
}

function App() {
  const [counters, setCounters] = useState<number[][]>(getIntialCartLineUp());
  const [newCartItems, setNewCartItems] = useState<number>(0);

  function handleOnSubmit(e: any) {
    e.preventDefault();
    const countersWithQueueTotal = counters.map((queue) => queue.reduce((total, current) => total + current, 0));
    const lowest = countersWithQueueTotal.reduce((prev, current) => prev < current ? prev : current);
    const lowestQueueIndex = countersWithQueueTotal.findIndex(i => i === lowest);
    const lowestQueue = counters[lowestQueueIndex];
    lowestQueue.push(newCartItems);
    counters[lowestQueueIndex] = lowestQueue;
    debugger;
    setCounters([...counters]);
    setNewCartItems(0);
  }

  return (
    <>
      <div className='mainContainer'>
        <form className='form' onSubmit={handleOnSubmit}>
          <input name='cartItems' type='number' min={1} value={newCartItems} required onChange={e => setNewCartItems(parseInt(e.currentTarget.value))} />
          <button type='submit'>Route Cart</button>
          <button type='button' onClick={() => {
            setCounters(getIntialCartLineUp);
            setNewCartItems(0);
          }}>Reset Counters</button>
        </form>
        <div className='checkoutCounters' style={{ gridTemplateColumns: 'repeat(' + counters.length + ', 1fr)' }}>
          {counters.map((counter, index) =>
            <div className={(index === 0 ? 'first' : index === counters.length - 1 ? 'last' : 'middle') + ' counter'} key={index}>Counter [{index}]
              <div key={'queue' + index} className='queue'>
                {counter.map((cart, index) =>
                  <>
                    {
                      cart > 0 &&
                      <div key={index} className='cart'>
                        {cart}
                      </div>
                    }
                  </>
                )}
              </div>
            </div>)}
        </div>
      </div>

    </>
  )
}

export default App
