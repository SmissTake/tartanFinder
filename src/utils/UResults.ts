import IResults from "../interface/IResults";

export default function UResults(results: IResults, index: number) {
  console.log('----------'+index+'------------')
  for (const key in results) {
    const value = results[key];
    if(!!value){
      console.log(`${key}: ${value}`);
    }
  }
}