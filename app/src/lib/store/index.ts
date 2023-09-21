import { action, observable, runInAction, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { User } from "@/lib/store/User";
import { addTeamApiMethod } from "@/lib/api/team-leader";
import { Team } from "@/lib/store/Team";

type user = InstanceType<typeof User>;
enableStaticRendering(typeof window === "undefined");
const defaultTab = "dashboard";

export class Store {
  public accessToken = "";
  public currentUser?: User | null = null;
  public currentTab = defaultTab;

  constructor() {
    this.currentUser = new User();
    this.currentTab = defaultTab;

    makeObservable(this, {
      currentUser: observable,
      currentTab: observable,
      hydrate: action,
      setCurrentTab: action,
    });
  }

  public hydrate(data: { user: user; accessToken: string }) {
    if (!data || !data.user) return;
    this.currentUser?.hydrate({
      user: data.user,
    });
    this.accessToken = data.accessToken !== null ? data.accessToken : "";
  }

  public async setCurrentTab({ currentTab }: { currentTab: string }) {
    runInAction(() => {
      this.currentTab = currentTab;
    });
  }

  public async addTeam({ name, logoUrl }: { name: string; logoUrl: string }) {
    const data = await addTeamApiMethod({ name, logoUrl }, this.accessToken);
    if (!data) return;
    const team = new Team(data);
    return team;
  }
}
