require('dotenv').config({ path: '.env.local' });
import UFetch from "./utils/UFetch";
import { UInput } from "./utils/UInput";
import UParse from "./utils/UParse";
import UResults from "./utils/UResults";
import * as qs from 'qs';
// import fs from 'fs';
import { stringify } from "querystring";


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

async function idSearch(){
  const idInput = new UInput();
  const id = parseFloat(idInput.prompt('What is the pattern id ?'));
  const params = {
    tnam: id
  }

  try {
    const response = await UFetch("", 'GET', null, null, null, params);
    await getPatternCode(response);
  }
  catch (error) {
    console.error(error);
  }
}

// function to fetch all tartans available on the website and stores them in a file
function getPatterns(){
  // fetch all tartan from 1 to no more
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
  } catch (error) {
    console.error(error);
  }
}