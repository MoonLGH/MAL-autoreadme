require("dotenv").config();
const fetch = require("node-fetch");
const parser = require("./lib/parser.js")
const readmeutil = require("./lib/readme-util.js")
const git = require("korefile")

async function init(){
    let username = process.env.username
    let gh_token = process.env.gh_token
    let readme_path = process.env.readme_path
    let branch = process.env.branch
    let useScraping = JSON.parse(process.env.useScraping || false)
    let limit = process.env.limit || 10

    console.log("username: " + username);
    console.log("readme_path: " + readme_path);
    console.log("branch: " + branch);

    let list
    if(useScraping === false){
        let fetched = (await (await fetch(`https://api.jikan.moe/v3/user/${username}/history`)).json())
        console.log(fetched)
        let history = fetched.history;
        console.log("History Founded, Parsing...")
        list = parser.parse(history,limit)
        console.log("History Parsed Success \n",list)
    } else {
        console.log("Using Scraping")
        let fetched = await parser.parseHistory(username)
        console.log(fetched)
        list = parser.parseListScraping(fetched,limit)
    }
    let readme = await readmeutil.readme(readme_path, gh_token)
    console.log("\nGetting current README.md")
    let newreadme = readmeutil.append(readme, list)
    console.log("Updated to the new readme")

    if (!gh_token) {
        throw new Error("Enter a token");
    }

    console.log("Pushing to Github")
    let file = git.createKoreFile({
        adaptor: git.createGitHubAdaptor({
            owner: readme_path.split("/")[0],
            repo: readme_path.split("/")[1],
            ref: `heads/${branch}`,
            token: gh_token
        })
    });

    file.writeFile("README.md", newreadme);

    console.log("README.md Updated, Ending Process...")
}

init()