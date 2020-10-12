import fs from 'fs';
import pgPromise from 'pg-promise';
const login = {
    serverType: 'postgres',
    host: '132.145.250.45',
    port: 5432,
    username: 'delta',
    password: 'delt@TCS20',
    database: 'delta',
};

const pgp = pgPromise();

const db = pgp(
    `${login.serverType}://${login.username}:${login.password}@${login.host}:${login.port}/${login.database}`
);
const dbExport = {
    db,
    /**@type {pgPromise.IConnected<{}, pg.IClient>} */
    con: undefined,
};
export default dbExport;
init();
async function init() {
    // const [resetTables, getTables]
    // = await Promise.all(
    //     ["ser
    await resetTables();
    printTables();
}

async function any(src) {
    let rows;
    let con;
    try {
        con = await db.connect();
        rows = await con.any(src);
    } catch (error) {
        console.log('oops');
    } finally {
        if (con) {
            con.done();
        }
        return rows;
    }
}

async function resetTables() {
    const src = await fs.promises.readFile(
        './server/queries/ResetTables.pgsql',
        { encoding: 'utf-8' }
    );
    const rows = await any(src);
    console.log(rows);
}

async function printTables() {
    const src = await fs.promises.readFile(
        './server/queries/SelectAllCollumns.pgsql',
        { encoding: 'utf-8' }
    );
    // console.log(src);
    const rows = await any(src);
    let table = [];
    let name = rows[0]?.table_name;
    for (const record of rows) {
        if (record.table_name !== name) {
            console.table(table);
            table = [];
            name = record.table_name;
        }
        table.push(record);
    }
    if (name) {
        console.log(name?.toUpperCase() + ': ');
        console.table(table);
    }
}
