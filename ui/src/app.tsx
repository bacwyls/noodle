import React, { useEffect, useState } from 'react';
// import Urbit from '@urbit/http-api';
import * as nock from 'nock.js';


// const api = new Urbit('', '', window.desk);
// api.ship = window.ship;
export function App() {

  useEffect(() => {
    doNock();
  }, []);

  const [result, setResult] = useState('');
  const [openHelp, setOpenHelp] = useState(false);

  const sInput = 'noodle-s';
  const fInput = 'noodle-f';
  function doNock() {
    let s = document.getElementById(sInput) as HTMLTextAreaElement;
    let f = document.getElementById(fInput) as HTMLTextAreaElement;

    if(!f || !s) return;
    let sv = s.value;
    let fv = f.value;

    let sn = normalize(sv);
    let fn = normalize(fv);

    try {
      let jres = nock.nock(sn, fn);
      let res = constructResult(jres);
      setResult(res);
    } catch {
      setResult('!!');
    }
  }

  function normalize(s:string) {
    s = s.replace(/\n/g, ' ') 
    return s.replace(/\s\s+/g, ' ');
  }

  function constructResult(r:object) {
    let s = JSON.stringify(r)
    s = s.replace(/,/g, ' ') 
    // TODO remove right association
    // return s.replace(/\s\s+/g, ' ');
    return s;
  }

  const nk4 = `Nock 4K

  A noun is an atom or a cell.  An atom is a natural number.  A cell is an ordered pair of nouns.
  
  Reduce by the first matching pattern; variables match any noun.
  
  nock(a)             *a
  [a b c]             [a [b c]]
  
  ?[a b]              0
  ?a                  1
  +[a b]              +[a b]
  +a                  1 + a
  =[a a]              0
  =[a b]              1
  
  /[1 a]              a
  /[2 a b]            a
  /[3 a b]            b
  /[(a + a) b]        /[2 /[a b]]
  /[(a + a + 1) b]    /[3 /[a b]]
  /a                  /a
  
  #[1 a b]            a
  #[(a + a) b c]      #[a [b /[(a + a + 1) c]] c]
  #[(a + a + 1) b c]  #[a [/[(a + a) c] b] c]
  #a                  #a
  
  *[a [b c] d]        [*[a b c] *[a d]]
  
  *[a 0 b]            /[b a]
  *[a 1 b]            b
  *[a 2 b c]          *[*[a b] *[a c]]
  *[a 3 b]            ?*[a b]
  *[a 4 b]            +*[a b]
  *[a 5 b c]          =[*[a b] *[a c]]
  
  *[a 6 b c d]        *[a *[[c d] 0 *[[2 3] 0 *[a 4 4 b]]]]
  *[a 7 b c]          *[*[a b] c]
  *[a 8 b c]          *[[*[a b] a] c]
  *[a 9 b c]          *[*[a c] 2 [0 1] 0 b]
  *[a 10 [b c] d]     #[b *[a c] *[a d]]
  
  *[a 11 [b c] d]     *[[*[a c] *[a d]] 0 3]
  *[a 11 b c]         *[a c]
  
  *a                  *a`
  return (
    <main className="flex justify-center min-h-screen font-mono text-xs">
      <div className="space-y-6 py-20 w-2/3">
        {/* <h1 className="text-3xl font-bold">*[a b]</h1> */}
        <div className="flex flex-col">

        

        <p>a</p>
        <textarea
        className={'mb-4 border border-black p-1'}
        id={sInput}
        onChange={doNock}
        defaultValue={'[1 2 3]'}
        />
        <p>b</p>
        <textarea
        className={'mb-4 border border-black p-1'}
        id={fInput}
        onChange={doNock}
        defaultValue={'[0 1]'}


        />
        <p>*[a b]</p>
        <span
        className={'mb-2 border border-black p-1 py-2'}
        >
          {result}
        </span>
       

          <div
            className={'justify-left'}
          >

            <button
              className={`pr-2 py-2 block ${openHelp ? 'font-bold' : ''}`}
              onClick={()=> {
                setOpenHelp(!openHelp)
              }}
            >
              ?
            </button>
            {openHelp &&
              // <p>help</p>
              <div>
                
              <span
              style={{
                whiteSpace: 'pre-line'
              }}
              >
                {nk4}

              </span>

              <p className='text-blue-600 underline mt-2 '>
                  <a href="https://youtu.be/oXVfucOxXrQ"
                    target='_blank'
                  >
                    learn
                  </a>
                </p>
              </div>
            }
          </div>

        </div>
        
      </div>
    </main>
  );
}
