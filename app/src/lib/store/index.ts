import { action, observable, runInAction, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { updateProfileApiMethod } from "@/lib/api/public";

enableStaticRendering(typeof window === "undefined");

export class Store {
  email = "";
  displayName = "";
  avatarUrl = "";

  constructor() {
    makeObservable(this, {
      displayName: observable,
      avatarUrl: observable,
      hydrate: action,
      updateProfile: action,
    });
  }

  hydrate(data: { email: string; displayName: string; avatarUrl: string }) {
    if (!data) return;

    this.email = data.email !== null ? data.email : "";
    this.displayName = data.displayName !== null ? data.displayName : "";
    this.avatarUrl = data.avatarUrl !== null ? data.avatarUrl : "";
  }

  async updateProfile({
    name,
    avatarUrl,
    cookie,
  }: {
    name: string;
    avatarUrl: string;
    cookie: string;
  }) {
    const email = this.email;
    const { updatedUser } = await updateProfileApiMethod(
      {
        email,
        name,
        avatarUrl,
      },
      cookie
    );

    runInAction(() => {
      this.displayName = updatedUser.displayName;
      this.avatarUrl = updatedUser.avatarUrl;
    });
  }
}
