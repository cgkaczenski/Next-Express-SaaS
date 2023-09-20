import { action, observable, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { User } from "@/lib/store/User";
import { UI } from "@/lib/store/UI";

type user = InstanceType<typeof User>;

enableStaticRendering(typeof window === "undefined");

export class Store {
  accessToken = "";
  public currentUser?: User | null = null;
  public ui?: UI | null = null;

  constructor() {
    this.currentUser = new User();
    this.ui = new UI();

    makeObservable(this, {
      currentUser: observable,
      ui: observable,
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
