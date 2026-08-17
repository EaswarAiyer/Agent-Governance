(function(){
  const agents=[
    {id:'AI-001',name:'GitHub Copilot',version:'1.214.0'},
    {id:'AI-002',name:'Claude Desktop',version:'0.10.42'},
    {id:'AI-003',name:'Cursor IDE',version:'1.5.7'},
    {id:'AI-004',name:'Ollama',version:'0.11.4'},
    {id:'AI-005',name:'Continue.dev',version:'1.0.3'},
    {id:'AI-006',name:'Gemini CLI',version:'0.1.18'},
    {id:'AI-007',name:'LM Studio',version:'0.3.21'},
    {id:'AI-008',name:'Codeium',version:'1.48.2'}
  ];
  const policies=[
    {id:'POL-001',name:'Engineering approved AI tools',agentMode:'Strict',allow:['GitHub Copilot','Claude Desktop','Cursor IDE'],block:['Ollama','Gemini CLI','LM Studio','Codeium'],autoUninstall:true,folders:['User Documents','Development Repositories'],websiteGroups:['Developer Services','Approved AI APIs'],applicationGroups:['Developer Toolchain'],promptCollection:true,dlpMode:'Audit',classifiers:['PII','Financial Data','Credentials & Secrets']},
    {id:'POL-002',name:'Pilot group monitoring',agentMode:'Audit',allow:['GitHub Copilot','Claude Desktop'],block:['Ollama'],autoUninstall:false,folders:['User Documents'],websiteGroups:['Corporate SaaS','Approved AI APIs'],applicationGroups:['Developer Toolchain','Office Applications'],promptCollection:true,dlpMode:'Audit',classifiers:['PII','Internal Documents']},
    {id:'POL-003',name:'Finance workstation controls',agentMode:'Strict',allow:['GitHub Copilot'],block:['Claude Desktop','Cursor IDE','Ollama','Gemini CLI','LM Studio','Codeium'],autoUninstall:true,folders:['Finance Workspace'],websiteGroups:['Corporate SaaS'],applicationGroups:['Office Applications'],promptCollection:true,dlpMode:'Strict',classifiers:['Financial Data','Credentials & Secrets','PII']}
  ];
  const users=['aarav.s','maya.r','liam.k','sophia.n','noah.p','isla.m','ethan.d','ava.j','lucas.b','zara.t','ben.w','grace.h'];
  function platformFor(i){if(i<=70)return {family:'Windows',os:'Windows 11 Enterprise',prefix:'WIN'};if(i<=100)return {family:'Mac',os:'macOS Sonoma 14.6',prefix:'MAC'};return {family:'Linux',os:'Ubuntu 24.04 LTS',prefix:'LNX'};}
  function installLocation(platform,user,agent){const slug=agent.name.toLowerCase().replace(/\s+/g,'-');if(platform.family==='Windows')return `C:\\Users\\${user}\\AppData\\Local\\${agent.name}`;if(platform.family==='Mac')return `/Users/${user}/Applications/${agent.name}.app`;return `/home/${user}/.local/share/${slug}`;}
  const endpoints=Array.from({length:120},(_,offset)=>{
    const i=offset+1,platform=platformFor(i),user=users[offset%users.length],agentCount=i<=98?1+((i*7)%4):0,policyCount=i<=84?1+((i*5)%3):0;
    const installedAgents=Array.from({length:agentCount},(_,index)=>{const agent=agents[(offset+index*2)%agents.length];return {...agent,installLocation:installLocation(platform,user,agent)};});
    const appliedPolicies=Array.from({length:policyCount},(_,index)=>policies[(offset+index)%policies.length]);
    const segment=i<=40?'DEV':i<=80?'CORP':'OPS';
    return {id:`EP-${String(i).padStart(3,'0')}`,name:`${platform.prefix}-${segment}-${String(i).padStart(3,'0')}`,domain:segment==='DEV'?'engineering.acme.local':segment==='CORP'?'corporate.acme.local':'operations.acme.local',platform:platform.family,os:platform.os,user,ip:`10.24.${10+Math.floor(offset/50)}.${2+(offset%250)}`,lastSeen:i%9===0?'2 hours ago':`${2+(i%47)} minutes ago`,status:i%17===0?'Attention required':'Online',agents:installedAgents,policies:appliedPolicies};
  });
  function endpointIds(from,to){return Array.from({length:to-from+1},(_,index)=>`EP-${String(from+index).padStart(3,'0')}`);}
  const deployments=[
    {id:'DEP-001',name:'Engineering Windows rollout',policyId:'POL-001',targetIds:endpointIds(1,42),lastModified:'Jun 2, 2026 02:30 PM',lastModifiedBy:'easwar',created:'May 28, 2026 10:15 AM'},
    {id:'DEP-002',name:'Developer Mac pilot monitoring',policyId:'POL-002',targetIds:endpointIds(71,88),lastModified:'Jun 1, 2026 11:45 AM',lastModifiedBy:'easwar',created:'May 30, 2026 04:20 PM'},
    {id:'DEP-003',name:'Finance controls rollout',policyId:'POL-003',targetIds:endpointIds(43,54),lastModified:'May 31, 2026 09:10 AM',lastModifiedBy:'security.admin',created:'May 24, 2026 03:05 PM'}
  ];
  window.ENDPOINT_AGENT_CATALOG=agents;
  window.ENDPOINT_POLICY_CATALOG=policies;
  window.ENDPOINTS=endpoints;
  window.DEPLOYMENT_TASKS=deployments;
})();
