// Real shipped WebAssembly inference; no mocked model/session.
import * as ort from '../vendor/ort/ort.wasm.min.mjs';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {SCNET,separateSCNet,modelInput,inverseStem} from '../song-separation.js';
ort.env.wasm.numThreads=1;
ort.env.wasm.wasmPaths=fileURLToPath(new URL('../vendor/ort/',import.meta.url));
const weights=Buffer.concat([0,1,2].map(i=>readFileSync(new URL('../models/scnet-base.'+i+'.bin',import.meta.url))));
const {createHash}=await import('node:crypto');if(createHash('sha256').update(weights).digest('hex')!==SCNET.sha256)throw Error('Model checksum');
const x=Float32Array.from({length:44100},(_,i)=>.1*Math.sin(i*2*Math.PI*110/44100)),input=modelInput([x,x]),round=inverseStem(input.data,0,0);let error=0;for(let i=0;i<x.length;i++)error=Math.max(error,Math.abs(round[i]-x[i]));if(error>1e-5)throw Error('STFT alignment / reconstruction');
const session=await ort.InferenceSession.create(weights,{executionProviders:['wasm']}),stems=await separateSCNet([x,x],session,ort,{progress:p=>console.log(p.stage)});await session.release();
const stats=stems.map(s=>({stem:s.name,samples:s.channels[0].length,rms:Math.sqrt(s.channels[0].reduce((a,x)=>a+x*x,0)/x.length)}));if(stats.some(s=>!Number.isFinite(s.rms)||s.samples!==44100)||stats[1].rms<.05||stats[1].rms<stats[0].rms*10)throw Error('Trained bass separation regression');
console.log(JSON.stringify({runtime:'shipped ONNX Runtime Web 1.21.0 / single-thread WASM',checksum:SCNET.sha256,roundtripMaxError:error,stats},null,2));
