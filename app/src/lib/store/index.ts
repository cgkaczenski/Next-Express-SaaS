import { action, observable, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { User } from "@/lib/store/User";

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

  hydrate(data: {
    email: string;
    displayName: string;
    avatarUrl: string;
    accessToken: string;
  }) {
    if (!data) return;

    this.currentUser?.hydrate({
      email: data.email !== null ? data.email : "",
      displayName: data.displayName !== null ? data.displayName : "",
      avatarUrl: data.avatarUrl !== null ? data.avatarUrl : "",
    });
    this.accessToken = data.accessToken !== null ? data.accessToken : "";
  }
}
