// Next.js Windows exports can place segment payloads in nested directories,
// while the browser requests their dot-separated public filenames.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve('out');
let count=0;
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const full=path.join(dir,entry.name);
 if(entry.isDirectory())walk(full);
 else if(entry.name.endsWith('.txt')){
  const parts=path.relative(root,full).split(path.sep);
  const at=parts.findIndex(x=>x.startsWith('__next.'));
  if(at>=0&&at<parts.length-1){
   const target=path.join(root,...parts.slice(0,at),parts.slice(at).join('.'));
   fs.copyFileSync(full,target);count++;
  }
 }
}}
walk(root);console.log(`Normalized ${count} static segment payloads`);
