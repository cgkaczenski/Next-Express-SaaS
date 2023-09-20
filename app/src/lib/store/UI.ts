import { action, observable, runInAction, makeObservable } from "mobx";

interface ui {
  currentTab: string;
}

const defaultTab = "dashboard";

export class UI implements ui {
  currentTab = defaultTab;

  constructor() {
    makeObservable(this, {
      currentTab: observable,
      updateCurrentTab: action,
    });
  }

  async updateCurrentTab({ currentTab }: { currentTab: string }) {
    runInAction(() => {
      this.currentTab = currentTab;
    });
  }
}
