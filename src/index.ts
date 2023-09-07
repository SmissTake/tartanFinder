require('dotenv').config({ path: '.env.local' });
import CName from "./class/CName";
import UFetch from "./utils/UFetch";
import { UInput } from "./utils/UInput";
import UParse from "./utils/UParse";
import UResults from "./utils/UResults";
import * as qs from 'qs';

const menuInput = new UInput();
const menu = menuInput.menu('What do you want to do ?', ['Find name of tartan (patern search)', 'Find name of tartan (id search)', 'Get all pattern data']);

switch (menu) {
  case 'Find name of tartan (pattern search)':
    patternSearch();
    break;
  case 'Find name of tartan (id search)':
    // idSearch();
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

function addVotes() {
  const targets = {
    '1':'.meaning__notfound',
    '2':'.meaning__notfound:nth-of-type(2)',
    '3':'.meaning__notfound:nth-of-type(3)',
    '4':'.meaning__notfound:nth-of-type(4)',
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = {
    vote: requestVote
  };

  const username = process.env.LUMINATI_USERNAME;
  const password = process.env.LUMINATI_PASSWORD;
  const port = process.env.LUMINATI_PORT;
  const host = process.env.LUMINATI_PROXY;

  const proxy = {
    host: host,
    port: port,
    auth: {
      username: username,
      password: password
    }
  };

  function getPatterns(){
    
  }


  const data = qs.stringify(body);
  const promises = [] as any;
  async function main() {
    for (let index = 0; index < parseInt(requestNumber); index++) {
      try {
        const response = await UFetch('/vote/' + name, 'POST', headers, index % 2 === 0 ? proxy : null, data);
        const results = await UParse(response, targets);
        UResults(results as {[key: string]: string}, index);
        promises.push(response);
      } catch (error) {
        console.error(error);
      }
    }
  }

  Promise.all(promises)
    .then((results) => {
      results.forEach((data, index) => {
        if (data) {
          UResults(data as {[key: string]: string}, index);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });

  main();
}