module.exports = {
    readme,
    append
} 

const atob = require("atob")
const btoa = require("btoa")
const fetch = require('node-fetch');
const patternstart = "<!-- MAL_ACTIVITY:start -->"
const patternend = "<!-- MAL_ACTIVITY:end -->"

async function dofetch(url,settings){
    let fetching = await fetch(url,{headers:{"Authorization":`token ${settings.gh_token}`}})
    let data = await fetching.json()
    return data
}

function decodeFromBase64(input) {
    input = input.replace(/\s/g, '');
    return decodeURIComponent(escape(atob( input )));
  }

  
async function readme(path,gh_token) {
    let fetchrepo = await dofetch(`https://api.github.com/repos/${path}/git/trees/main`,{gh_token})
    if(!fetchrepo.tree.find(x => x.path === 'README.md')){
        throw new Error("No README.md found")
    }
    let readme = await dofetch(fetchrepo.tree.find(x => x.path === 'README.md').url,{gh_token})

    return decodeFromBase64(readme.content)
}

function append(readme,data){
    if(!readme.includes(patternstart)){
        throw new Error("No pattern start found")
    }
    if(!readme.includes(patternend)){
        throw new Error("No pattern end found")
    }

    // replace start to end with none
    let start = readme.indexOf(patternstart)
    let end = readme.indexOf(patternend)
    let newreadme = readme.substring(0,start+patternstart.length) + "\n\n" + data + "\n\n" + readme.substring(end,readme.length)

    return newreadme
}