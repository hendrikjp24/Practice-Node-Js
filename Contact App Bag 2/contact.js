const fs = require("fs");
const validator = require("validator");

// cek apakah direktori yang dimaksud ada atau tidak
const dirPath = "./data";

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// cek apakah file yang dimaksud ada atau tidak
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

    // in the below is a validation using package validator. but, i have problem how to ignore space supaya masuk ke dalam pattern nya.
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

// find contact by name
function findDataContactByName(name){
    const file = loadFile();

    const dataContact = file.find(e => e.nama.toLowerCase() == name.toLowerCase());

    if(!dataContact){
        console.log("Tidak ada contact dengan nama tersebut!!");
        return false;
    }

    console.log(`Data contact ${dataContact.nama} : \n`);

    console.log(`Nama : ${dataContact.nama}`);
    console.log(`No Hp : ${dataContact.noHp}`);

    (Object.keys(dataContact).length == 3) ? console.log(`Email : ${dataContact.email}`) : "";

}

//delete contact by name 
function deleteContactByName(name){
    // load file
    const file = loadFile();

    // mencari data berdasarkan nama di contacts
    const cekData = file.find(e => e.nama.toLowerCase() == name.toLowerCase());

    if(!cekData){
        console.log(`Tidak ada data contact dengan nama ${name}!!!`);
        return false;

    }


    for(let i = 0; i < file.length; i++){
        if(file[i].nama.toLowerCase() == name.toLowerCase()){
            // fungsi splice dibawah untuk mengambil data value dari array berdasarkan nama
            file.splice(i, 1);
        }
    }

    // memasukkan/ simpan ke dalam file setelah data contact yang dimaksud dihapus
    fs.writeFileSync(filePath,JSON.stringify(file), "utf-8");

    console.log('Data contact berhasil dihapus!!');

}



module.exports = {saveContact, findDataContactByName, deleteContactByName}