const yargs = require("yargs");
const contacts = require("./contact");
// command add
yargs.command({
    command: 'add',
    describe: 'Menambahkan data contact baru',
    builder: {
        nama: {
            alias: 'name',
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email yang dapat dihubungi',
            demandOption: false,
            type: 'string'
        },
        noHp: {
            alias: 'phone',
            describe: 'No Hp yang aktif',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.saveContact(argv.nama, argv.email, argv.noHp);
    }
}).demandCommand();

// command find
yargs.command({
    command : 'find',
    describe : 'find data contact',
    builder : {
        nama : {
            alias : 'name',
            describe : 'nama contact',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        contacts.findDataContactByName(argv.nama);
    }
})

// command delete
yargs.command({
    command : 'delete',
    describe : 'delete contact by name',
    builder : {
        nama: {
            alias : 'name',
            describe : 'nama contact',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        contacts.deleteContactByName(argv.nama);
    }
})

//command for llist contact
yargs.command({
    command : 'list',
    describe : 'List Data Contact',
    handler(argv){
        contacts.listContact();
    }
})

yargs.parse();