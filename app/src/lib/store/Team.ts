import { observable, action, makeObservable } from "mobx";

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

  constructor(params?: team) {
    if (params) {
      this.id = params.id;
      this.name = params.name;
      this.logoUrl = params.logoUrl;
      this.teamLeaderId = params.teamLeaderId;
      this.memberIds = params.memberIds;
    }

    makeObservable(this, {
      name: observable,
      memberIds: observable,
      hydrate: action,
    });
  }

  hydrate(data: { team: team }) {
    if (!data) return;
    this.id = data.team.id !== null ? data.team.id : "";
    this.name = data.team.name !== null ? data.team.name : "";
    this.logoUrl = data.team.logoUrl !== null ? data.team.logoUrl : "";
    this.teamLeaderId =
      data.team.teamLeaderId !== null ? data.team.teamLeaderId : "";
    this.memberIds = data.team.memberIds !== null ? data.team.memberIds : [""];
  }
}
