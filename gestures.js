// Restore only the gesture's editing domain. Effects, routing and other clips
// are never part of a note/clip/automation rollback.
export function restoreGesture(project,snapshot,scope){
 if(scope.loop)project.loop=structuredClone(snapshot.loop);
 if(scope.midi){const find=p=>p.tracks.flatMap(t=>t.clips).find(c=>c.id===scope.midi),dst=find(project),src=find(snapshot);if(dst&&src)for(const key of ['notes','cc','expression']){if(key in src)dst[key]=structuredClone(src[key]);else delete dst[key];}}
 if(scope.lane){const find=p=>[p.master,...p.tracks].flatMap(t=>t.automation||[]).find(l=>l.id===scope.lane),dst=find(project),src=find(snapshot);if(dst&&src)dst.points=structuredClone(src.points);}
 if(scope.clips){const ids=new Set(scope.clips);for(const t of project.tracks)t.clips=t.clips.filter(c=>!ids.has(c.id));for(const t of snapshot.tracks){const dst=project.tracks.find(x=>x.id===t.id);if(dst)t.clips.forEach((c,index)=>{if(ids.has(c.id))dst.clips.splice(Math.min(index,dst.clips.length),0,structuredClone(c));});}}
}
export function commitGesture(store,before,name,scope){
 const after=structuredClone(store.project),undo=structuredClone(after);restoreGesture(undo,before,scope);
 if(JSON.stringify(undo)===JSON.stringify(after))return;
 store.undoStack.push({name,before:undo,after});if(store.undoStack.length>100)store.undoStack.shift();store.redoStack=[];store.dirty=true;store.emit({name,edit:true});
}
export function pointerGesture(owner,e,move,up,cancel=()=>{}){
 owner.cancelDrag?.();let active=true;const canvas=owner.canvas;
 const cleanup=()=>{active=false;owner.cancelDrag=null;for(const [type,fn]of [['pointermove',motion],['pointerup',end],['pointercancel',abort],['lostpointercapture',abort]])canvas.removeEventListener(type,fn);};
 const matches=ev=>ev?.pointerId===undefined||ev.pointerId===e.pointerId;
 const motion=ev=>{if(active&&matches(ev))move(ev);};
 const end=ev=>{if(!active||!matches(ev))return;cleanup();up();};
 const abort=ev=>{if(!active||!matches(ev))return;cleanup();cancel();};
 owner.cancelDrag=abort;canvas.setPointerCapture(e.pointerId);for(const [type,fn]of [['pointermove',motion],['pointerup',end],['pointercancel',abort],['lostpointercapture',abort]])canvas.addEventListener(type,fn);
}
