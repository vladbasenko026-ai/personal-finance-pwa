import {readdir,readFile,cp,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
for(const f of await readdir('src',{recursive:true})) if(f.endsWith('.js')) execFileSync(process.execPath,['--check','src/'+f]);
JSON.parse(await readFile('src/manifest.webmanifest','utf8'));
await rm('dist',{recursive:true,force:true});await cp('src','dist',{recursive:true});console.log('Build OK: dist/');
