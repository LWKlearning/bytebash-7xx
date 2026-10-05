import {analyzeSong} from './song-analysis.js';
self.onmessage=e=>{try{const result=analyzeSong(e.data.channels,e.data.sampleRate,e.data.options,progress=>self.postMessage({progress})),transfers=[...result.harmonic,...result.percussion,...result.samples.flatMap(s=>s.channels)].map(ch=>ch.buffer);self.postMessage({result},transfers);}catch(error){self.postMessage({error:error.message});}};
