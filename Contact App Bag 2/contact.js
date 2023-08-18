const fs = require("fs");
const validator = require(validator);

const dirPath = "./data";

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const filePath = "./data/contact.json";

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, "[]");
}

// Me load file dari data yang dibaca pada file json
function loadFile(){
    return JSON.parse(fs.readFileSync(filePath,"utf-8"));
}

// Save Contact
function saveContact(nama, email, noHp){
    const file = loadFile();

    //Validasi inputan nama
    if(!validator.isAlpha(nama, "az-AZ")){
        console.log("Nama hanya boleh mengandung huruf saja!!");
        return false;
    }

    //validasi email
    if(!validator.isEmail(email)){
        console.log("Mohon masukkan email yang benar!!");
        return false;
    }

    //validasi noHp
    if(!validator.isMobilePhone(noHp, "id-ID")){
        console.log("Masukkan No Hp Indonesia Yang Valid!!");
        return false;
    }

}