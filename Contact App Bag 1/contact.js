const fs = require("fs");
const readline = require("readline");

// Cek path Direktori apakah ada atau tidak
const dirPath = "./data";

if(!fs.existsSync(dirPath)){
    fs.mkdirSync("./data");
}

// Cek apakah file ada atau tidak
const filePath = "./data/contacts.json";

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, "[]", "utf-8"); // create file
}

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

/// Function untuk menangkap pertannyaan
function tulisPertanyaan(pertanyaan){
    return new Promise(resolve => {
        rl.question(pertanyaan, (answer) => {
            resolve(answer);
        })
    });
}

//SAVE CONTACT TO FILE JSON

function saveContact(nama, noHp, email){
    const contact = {nama, noHp, email};

    const data = fs.readFileSync(filePath, "utf-8");

    if(data == ""){
        fs.writeFileSync(filePath, "[]", "utf-8");
    }

    const contacts = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    contacts.push(contact);

    fs.writeFileSync(filePath, JSON.stringify(contacts), "utf-8");

}

function closeInputUser(){
    rl.close();
}

module.exports = {tulisPertanyaan, saveContact, closeInputUser};