import { action, observable, runInAction, makeObservable } from "mobx";
import { updateProfileApiMethod } from "@/lib/api/public";

interface user {
  email: string;
  displayName: string;
  avatarUrl: string;
}

export class User implements user {
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

  hydrate(data: { user: user }) {
    if (!data) return;
    this.email = data.user.email !== null ? data.user.email : "";
    this.displayName =
      data.user.displayName !== null ? data.user.displayName : "";
    this.avatarUrl = data.user.avatarUrl !== null ? data.user.avatarUrl : "";
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
