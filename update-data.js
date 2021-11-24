const yaml = require('js-yaml')
const fs = require('fs')
const {DateTime} = require('luxon')


const [, , y, d, c] = process.argv;
const data = fs.readFileSync(`data/${y}.yml`)
let doc = yaml.load(data)

let date = DateTime.fromISO(d, {zone: "UTC"});

let progresses = doc.progress
let index = progresses.findIndex(element => {
    let x = DateTime.fromJSDate(element.date, {zone: "UTC"});
    return x.year == date.year && x.month == date.month && x.day == date.day;
})

let count = parseInt(c);
if (index < 0) {
    if (count > 0)
    {
        // Not found, so add it to the end
        doc.progress.push({date: date.toJSDate(), count: parseInt(count)})
    }
} else if (count <= 0){
    // Found, but new count is non-positive, so remove it from the list
    doc.progress.splice(index, 1)
} else {
    // Found, update original value
    doc.progress[index].count = count;
}

doc.progress.sort((x, y) => {
    a = x.date;
    b = y.date;
    if (a.getYear() == b.getYear()) {
        if (a.getMonth() == b.getMonth()) {
            return a.getDate() - b.getDate();
        } else {
            return a.getMonth() - b.getMonth();
        }
    } else {
        return a.getYear() - b.getYear();
    }
})

fs.writeFileSync(`data/${y}.yml`, yaml.dump(doc));


