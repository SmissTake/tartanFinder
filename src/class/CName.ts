export default class CName {

  totalVotes: number;
  currentAverage: number;

  constructor(totalVotes: number, currentAverage: number) {
    this.totalVotes = totalVotes;
    this.currentAverage = currentAverage;
  }

  private getNewVote(targetAverage: number) {
    if (this.currentAverage < targetAverage) {
      return (10);
    } 
    else if (this.currentAverage > targetAverage) {
      return (0);
    }
    else {
      console.log("Targeted name already have an average note of " + targetAverage);
      return;
    }
  }

  /** Get the number of vote to get a new average
   * @param new_average The new average
   * @returns The number of vote to get a new averages
  */
  public getVoteForNewAverage(targetAverage: number) {
      return ((this.totalVotes * this.currentAverage - targetAverage * this.totalVotes) / (targetAverage - this.getNewVote(targetAverage)!));
  }
}