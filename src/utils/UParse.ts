import { JSDOM } from 'jsdom';
import IResults from '../interface/IResults';

export default async function UParse(html: string, targets: IResults) {
  const dom = new JSDOM(html);
  const results: {[key: string]: string | undefined} = {};
  for (const key in targets) {
    if (targets.hasOwnProperty(key)) {
      const text = dom.window.document.querySelector(targets[key])?.textContent;
      results[key] = text ?? undefined;
    }
  }
  return results;
}