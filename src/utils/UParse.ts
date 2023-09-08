import { JSDOM } from 'jsdom';
import IResults from '../interface/IResults';

export default async function UParse(html: string, targets: IResults) {
  const dom = new JSDOM(html);
  const results: {[key: string]: string | undefined} = {};
  for (const key in targets) {
    if (targets.hasOwnProperty(key)) {
      const selector = targets[key];
      const element = dom.window.document.querySelector(selector);
      if (element) {
        if (selector === 'canvas') {
          const tabulation = element.getAttribute('tabulation');
          results[key] = tabulation ?? undefined;
        } else {
          const text = element.textContent;
          results[key] = text ?? undefined;
        }
      }
    }
  }
  return results;
}