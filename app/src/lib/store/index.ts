import { action, observable, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { User } from "@/lib/store/User";

type user = InstanceType<typeof User>;

enableStaticRendering(typeof window === "undefined");

export class Store {
  accessToken = "";
  public currentUser?: User | null = null;

  constructor() {
    this.currentUser = new User();

    makeObservable(this, {
      currentUser: observable,
      hydrate: action,
    });
  }

  hydrate(data: { user: user; accessToken: string }) {
    if (!data || !data.user) return;
    this.currentUser?.hydrate({
      user: data.user,
    });
    this.accessToken = data.accessToken !== null ? data.accessToken : "";
  }
}
