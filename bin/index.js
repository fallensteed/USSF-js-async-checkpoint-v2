#!/user/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const fetch = require('node-fetch');
const fs = require('fs');

let pokeInput = fs.readFileSync('bin/input.txt', 'utf-8');
pokeInput = pokeInput.replace(/(\r)/gm,'');
let pokeArray = pokeInput.split('\n');
pokeArray = pokeArray.map(data => data.toLowerCase());

async function readPokeData(name){
    await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
        .then(data => data.json())
        .then(data => {
            console.log(name[0].toUpperCase() + name.substr(1) + ': ' + data.types.map(element => element.type.name).join(', '));
        })
        .catch(err => console.log(err))
}
pokeArray.forEach(data => readPokeData(data));
