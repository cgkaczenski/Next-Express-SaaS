import { observable, makeObservable } from "mobx";

interface team {
  id: string;
  name: string;
  logoUrl: string;
  teamLeaderId: string;
  memberIds: string[];
}

export class Team implements team {
  public id = "";
  public name = "";
  public logoUrl = "";
  public teamLeaderId = "";
  public memberIds = [""];

  constructor(params: team) {
    this.id = params.id;
    this.name = params.name;
    this.logoUrl = params.logoUrl;
    this.teamLeaderId = params.teamLeaderId;
    this.memberIds = params.memberIds;

    makeObservable(this, {
      name: observable,
      memberIds: observable,
    });
  }
}
