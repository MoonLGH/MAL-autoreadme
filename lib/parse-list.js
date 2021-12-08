module.exports = {
    parse
}
function parse(list) {
    list = list.slice(0, 10);

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