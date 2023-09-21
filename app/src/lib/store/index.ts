import { action, observable, runInAction, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { User } from "@/lib/store/User";

type user = InstanceType<typeof User>;
enableStaticRendering(typeof window === "undefined");
const defaultTab = "dashboard";

export class Store {
  accessToken = "";
  public currentUser?: User | null = null;
  currentTab = defaultTab;

  constructor() {
    this.currentUser = new User();

    makeObservable(this, {
      currentUser: observable,
      currentTab: observable,
      hydrate: action,
      setCurrentTab: action,
    });
  }

  hydrate(data: { user: user; accessToken: string }) {
    if (!data || !data.user) return;
    this.currentUser?.hydrate({
      user: data.user,
    });
    this.accessToken = data.accessToken !== null ? data.accessToken : "";
  }

  async setCurrentTab({ currentTab }: { currentTab: string }) {
    runInAction(() => {
      this.currentTab = currentTab;
    });
  }
}
