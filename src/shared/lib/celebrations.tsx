import Snowfall from "react-snowfall";
import { ReactNode } from "react";
import christmasLogo from "@/assets/christmas-logo.svg";

interface Celebration {
  isTimeToCelebrate(): boolean;
  launchVisuals(): ReactNode | void;
  customLogo(): ReactNode;
}

class Christmas implements Celebration {
  isTimeToCelebrate() {
    return new Date().getMonth() === 11; //December is the 11 month
  }

  launchVisuals() {
    return <Snowfall />;
  }

  customLogo() {
    return <img src={christmasLogo} />;
  }
}

class Celebrant {
  public actualCelebration: Celebration | null = null;

  constructor(celebrations: Celebration[]) {
    for (const celebration of celebrations) {
      if (!celebration.isTimeToCelebrate()) {
        return;
      }
      if (this.actualCelebration !== null) {
        throw new Error("Two celebrations cannot happen in the same time!");
      }
      this.actualCelebration = celebration;
    }
  }
}

const celebrations: Celebration[] = [new Christmas()];

export default new Celebrant(celebrations);
