const contacts = require("./contact");

async function main(){
    const nama = await contacts.tulisPertanyaan("Nama : ");
    const noHp = await contacts.tulisPertanyaan("No Hp : ");
    const email = await contacts.tulisPertanyaan("Email : ");

    contacts.saveContact(nama, noHp, email);
}

main();