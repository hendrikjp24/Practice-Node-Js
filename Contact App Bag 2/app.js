const yargs = require("yargs");
const contacts = require("./contact");

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

yargs.parse();