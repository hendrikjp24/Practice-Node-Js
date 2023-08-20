const fs = require("fs");
const { json } = require("stream/consumers");
const validator = require("validator");

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
    // if(!validator.isAlpha(nama, "az-AZ")){
    //     console.log("Nama hanya boleh mengandung huruf saja!!");
    //     return false;
    // }

    // validasi manual menggunakan regex
    const regexNama = new RegExp("^[A-Za-z ]+$"); // Penulisan regex di javascript memakai ^  dan diakiri dengan + $

    // ^ => diawalai dengan
    // +$ => diakhiri dengan

    // dengan menggunakan method test() akan mengembalikan nilai boolean
    if(regexNama.test(nama) == false){
        console.log("Nama hanya boleh mengandung huruf alphabet saja!!");
        return false;
    }

    // cek duplikat berdasarkan nama
    const duplikat = file.find(e => e.nama.toLowerCase() == nama.toLowerCase());

    if(duplikat){
        console.log("Data Contact dengan nama tersebut sudah ada!!");
        return false;
    }

    //validasi email
    if(email){
        if(!validator.isEmail(email)){
            console.log("Mohon masukkan email yang benar!!");
            return false;
        }
    }

    //validasi noHp
    if(!validator.isMobilePhone(noHp, "id-ID")){
        console.log("Masukkan No Hp Indonesia Yang Valid!!");
        return false;
    }

    const contact = {nama, email, noHp};

    file.push(contact);

    fs.writeFileSync(filePath, JSON.stringify(file));

    console.log("Data contact berhasil disimpan");

}

module.exports = {saveContact}