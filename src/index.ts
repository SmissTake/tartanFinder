require('dotenv').config({ path: '.env.local' });
import IResults from "./interface/IResults";
import UFetch from "./utils/UFetch";
import { UInput } from "./utils/UInput";
import UParse from "./utils/UParse";
import UResults from "./utils/UResults";
import * as fs from 'fs';


const menuInput = new UInput();
const menu = menuInput.menu('What do you want to do ?', ['Find name of tartan (patern search)', 'Find name of tartan (id search)', 'Get all pattern data']);

switch (menu) {
  case 'Find name of tartan (pattern search)':
    patternSearch();
    break;
  case 'Find name of tartan (id search)':
    idSearch();
    break;
  case 'Get all pattern data':
    getPatterns();
  default:
    break;
}


function patternSearch() {
  const patternInput = new UInput();
  const pattern = parseFloat(patternInput.prompt('What is the pattern ?'));

  

}

function idSearch(){
  const idInput = new UInput();
  const id = parseFloat(idInput.prompt('What is the pattern id ?'));

  fetchById(id)
}

async function fetchById(id:number) {
  const params = {
    tnam: id
  }
  try {
    const response = await UFetch("", 'GET', null, null, null, params);
    return(await getPatternCode(response));
  }
  catch (error) {
    console.error(error);
  }
}
// function to fetch all tartans available on the website and stores them in a file
async function getPatterns(){
  // fetch all tartan from 1 to no more
  let i:number = 1;
  while(i!=-1) {
    try {
      const result = await fetchById(i);
      writeInfoTxt(result);
      i++;
    } catch (error) {
      i=-1;
    }
  }
}

function writeInfoTxt(results: any) {
  const data = JSON.stringify(results, null, 2) + ',\n';
  fs.appendFile('patterns.json', data, (err) => {
    if (err) throw err;
    console.log('Patterns written to file');
  });
}

async function getPatternCode(res:any){
  const targets = {
    '1':'.title',
    '2':'.ftr-hdr',
    '3':'canvas'
  };

  try {
    const results = await UParse(res, targets);
    UResults(results as {[key: string]: string});

    //if there is no pattern code it's a 404
    if (!results['3']) {
      throw new Error('Canvas element is empty');
    }

    return results;
  } catch (error) {
    console.error(error);
  }
}