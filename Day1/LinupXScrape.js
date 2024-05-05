const req = require("request")
const cheerio = require("cheerio")

req("https://lineupx.com/" , cb)

function cb(err,status,html){
    if (err){
        console.log(err)
    }else{
        parse_html(html)
    }
}

function parse_html(html){
    const parse_tool = cheerio.load(html)
    
    const box_content = parse_tool('.font-semibold.text-base.leading-\\[26px\\].text-\\[\\#4D515B\\]')
    const box_number = parse_tool('.font-semibold.text-4xl.leading-\\[47px\\].text-\\[\\#493AD2\\]')
    for (let i = 0 ;i < box_content.length ;i++){
        let each_content = parse_tool(box_content[i]).text()
        let each_number = parse_tool(box_number[i]).text()

        console.log(each_content + " : " + each_number )
    }
}