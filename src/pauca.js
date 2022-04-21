//Nullum magnum ingenium sine mixture dementia fuit. - There has been no great wisdom without an element of madness.
//And thus i present - Pauca.

//cd imp_js
//node pauca -s="./gen/test.pau" -i="./gen/input.txt" -o="./gen/output.txt"

import parse from "args-parser" //i was too lazy to parse them myself ;-;
import fs from 'fs' //for reading the 3 files content

import { Transpile, TranspileMode } from "./transpile.js"
import { info, log, error } from "./utils/log.js"

const error_code = Main()
if(error_code)
    error(`Pauca exited with error code ${error_code}`)
else
    info('Success!')

function Main(){
    let args = parse(process.argv)
    args = Object.assign({ s: './s.pau', i: './input.txt', o: './output.txt', m: 'replace', v: 1 }, args);
    switch (args.m) {
        case 'single': args.m = TranspileMode.SINGLE; break;
        case 'multiple': args.m = TranspileMode.MULTIPLE; break;
        case 'replace': args.m = TranspileMode.REPLACE; break;
    }

    //handle args bad cases
    if (args.h || args.help){
        console.log(`
    -h, -help               Show this help message and exit.
    -s SYNTAX
                            Path to the transpilation syntax .pau file (string path).
    -i INPUT
                            Path to the input plain text file (string path).
    -o OUTPUT
                            Path to the target plain text file (string path).
    -m MODE
                            Transpilation mode (string). [single, multiple, replace]
    -v VERBOSE
                            Verbose (int). [0, 1]
        `)
        log('Args set:', args)
        process.exit(0)
    }
    
    //set up the 2 texts to work with from their files
    const syntax = fs.readFileSync(args.s, { encoding: 'utf8', flag: 'r' })
    const source = fs.readFileSync(args.i, { encoding: 'utf8', flag: 'r' })

    //do the transpilation
    const output = Transpile(syntax, source, { mode:args.m, verbose: args.v}) || ''

    //write transpilation to output file
    fs.writeFileSync(args.o, output, { encoding: 'utf8', flag: 'w' })

    return 0
}


//https://jsdoc.app/index.html

