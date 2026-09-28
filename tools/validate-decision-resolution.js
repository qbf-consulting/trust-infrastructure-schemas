const fs=require('fs');
function load(p){return JSON.parse(fs.readFileSync(p,'utf8'))}
const schema=load('decision/decision-resolution-evidence.schema.json');
const evidence=load('examples/decision-resolution-evidence-change.json');
const unresolved=load('examples/decision-resolution-unresolved-peer.json');
const cats=new Set(schema.properties.transition_basis.properties.primary_category.enum);
for(const c of ['authority_change','evidence_change','policy_change','lifecycle_change','correction','evaluation_context_change','none']) if(!cats.has(c)) throw new Error('missing category '+c);
if(evidence.condition.state!=='resolved'||evidence.transition_basis.primary_category!=='evidence_change'||evidence.transition_basis.authority_changed!==false) throw new Error('evidence-change fixture violates decision-basis separation');
if(unresolved.condition.state!=='unresolved'||unresolved.transition_basis.primary_category!=='none'||unresolved.transition_basis.changed_dimensions.length!==0) throw new Error('unresolved fixture silently resolves');
if(schema['x-tsmm-semantic-binding'].authorityTransfer!==false) throw new Error('semantic authority transferred');
const forbidden=['peer_pressure','repetition','reputation','workflow_progression'];
for(const f of forbidden) if(cats.has(f)) throw new Error('non-admissible resolution category '+f);
console.log('Decision resolution evidence: PASS');
