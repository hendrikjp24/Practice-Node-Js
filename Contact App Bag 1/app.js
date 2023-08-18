const contacts = require("./contact");

async function main(){

    const isLooping = true;

    while(isLooping){
        const nama = await contacts.tulisPertanyaan("Nama : ");
        const noHp = await contacts.tulisPertanyaan("No Hp : ");
        const email = await contacts.tulisPertanyaan("Email : ");
    
        contacts.saveContact(nama, noHp, email);

        const validasi = await contacts.tulisPertanyaan("Add another contact (y/n)? ");

        if(validasi == "n"){
            contacts.closeInputUser();
            break;
        }

    }



}

main();