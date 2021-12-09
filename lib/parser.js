module.exports = {
    parseList,
    parseHistory,
    parseListScraping
}
const axios = require('axios')
const cheerio = require('cheerio')

// scrap https://myanimelist.net/history/MoonLMAL with axios and cheerio
async function parseHistory(username){
    let data = await axios.get(`https://myanimelist.net/history/${username}`)
    let $ = cheerio.load(data.data)
    let lists = $('table > tbody > tr > td')
    // loop for each list
    let returnedarray = []
    lists.find("a").each((ele,i) =>{
        let date = $(i).parent().parent().find("td").eq(1).text().trim()
        let increment = $(i).parent().parent().find("td > strong").text().trim()

        let type = $(i).attr("href")
        let link = "https://MyAnimeList.net"+$(i).attr("href")
        type = type.includes("manga") ? "manga" : "anime"
        let name = $(i).text().trim()

        returnedarray.push({date,increment,type,name,link})
    })
    return returnedarray
}

function parseListScraping(list,limit){
    limit = parseInt(limit)
    list = list.slice(0, limit);

    let returnedlist = []

    for (let i = 0; i < list.length; i++) {
        let activity
        if(list[i].type === "manga"){
            activity = "- 📖 Read"
        }else if (list[i].type === "anime"){
            activity = "- 📺 Watched"
        }
    
        returnedlist.push(`${activity} [${list[i].name}](${list[i].link}) ${list[i].type === "manga" ? "Chapter" : "Episode"} ${list[i].increment} on (${list[i].date})`)
    }

    return returnedlist.join("\n")
}

function parseList(list) {
    limit = parseInt(limit)
    list = list.slice(0, limit);

    let returnedlist = []

    for (let i = 0; i < list.length; i++) {
        let activity
        if(list[i].meta.type === "manga"){
            activity = "- 📖 Read"
        }else if (list[i].meta.type === "anime"){
            activity = "- 📺 Watched"
        }
        let parsedate = new Date(list[i].date)
        let date = parsedate.getDate()
        let month = parsedate.getMonth()
        let year = parsedate.getFullYear()
    
        returnedlist.push(`${activity} [${list[i].meta.name}](${list[i].meta.url}) ${list[i].meta.type === "manga" ? "Chapter" : "Episode"} ${list[i].increment} on (${date}/${month}/${year})`)
    }

    return returnedlist.join("\n")
}