import { action, observable, runInAction, makeObservable } from "mobx";
import { updateProfileApiMethod } from "@/lib/api/public";

export class User {
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
    accessToken,
  }: {
    name: string;
    avatarUrl: string;
    accessToken: string;
  }) {
    const email = this.email;
    const { updatedUser } = await updateProfileApiMethod(
      {
        email,
        name,
        avatarUrl,
      },
      accessToken
    );

    runInAction(() => {
      this.displayName = updatedUser.displayName;
      this.avatarUrl = updatedUser.avatarUrl;
    });
  }
}
