import test from 'node:test';import assert from 'node:assert/strict';import {createRepository} from '../src/data/repository.js';import {addTransaction,balanceCents} from '../src/domain/transactions.js';
const valid={amount:'125.50',type:'income',date:'2026-11-25',category:'Дохід'};function setup(){const m=new Map();const storage={getItem:k=>m.get(k),setItem:(k,v)=>m.set(k,v)};return {repo:createRepository(storage),storage};}const add=(r,o={})=>addTransaction(r,{...valid,...o},()=> 'id');
test('TC-01 valid operation persists',()=>{const {repo,storage}=setup();const t=add(repo);assert.deepEqual(createRepository(storage).list(),[t]);assert.deepEqual(t,{id:'id',amountCents:12550,type:'income',date:valid.date,category:valid.category});});
test('TC-02 missing category rejected',()=>{const {repo}=setup();assert.throws(()=>add(repo,{category:' '}),/категорію/);assert.equal(repo.list().length,0);});
test('TC-03 zero amount rejected',()=>{const {repo}=setup();assert.throws(()=>add(repo,{amount:'0'}),/Сума/);assert.equal(repo.list().length,0);});
test('TC-04 negative amount rejected',()=>{const {repo}=setup();assert.throws(()=>add(repo,{amount:'-10'}),/Сума/);});
test('TC-05 minimum amount and balance',()=>{const {repo}=setup();add(repo);add(repo,{type:'expense',amount:'0.01'});assert.equal(balanceCents(repo.list()),12549);});
test('TC-06 invalid date/type rejected',()=>{const {repo}=setup();assert.throws(()=>add(repo,{date:'2026-02-30'}),/дату/);assert.throws(()=>add(repo,{type:'unknown'}),/тип/);});
