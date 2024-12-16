import Snowfall from "react-snowfall";
import { ReactNode } from "react";
import christmasLogo from "@/assets/christmas-logo.svg";
import newYearLogo from "@/assets/fireworks.svg";
import { Fireworks } from "@fireworks-js/react";

interface Celebration {
  isTimeToCelebrate(): boolean;
  launchVisuals(): ReactNode | void;
  customLogo(): ReactNode;
}

class Christmas implements Celebration {
  isTimeToCelebrate() {
    const isDecember = new Date().getMonth() === 11;
    const today = new Date().getDay();
    return isDecember && today < 31; //December is the 11 month
  }

  launchVisuals() {
    return <Snowfall />;
  }

  customLogo() {
    return <img src={christmasLogo} />;
  }
}

class NewYear implements Celebration {
  isTimeToCelebrate() {
    const isDecember = new Date().getMonth() === 11; //December is the 11 month

    const isJanuary = new Date().getMonth() === 0;
    const today = new Date().getDate();
    const januaryCelebrationDays = [1, 2, 3, 4, 5, 6, 7];

    if (isDecember && today === 31) {
      return true;
    }
    if (isJanuary && januaryCelebrationDays.includes(today)) {
      return true;
    }
    return false;
  }

  launchVisuals() {
    return (
      <Fireworks
        autostart
        options={{ opacity: 0.5, mouse: { click: true } }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
      />
    );
  }

  customLogo() {
    return <img src={newYearLogo} />;
  }
}

class Celebrant {
  public actualCelebration: Celebration | null = null;

  constructor(celebrations: Celebration[]) {
    for (const celebration of celebrations) {
      if (!celebration.isTimeToCelebrate()) {
        continue;
      }
      if (this.actualCelebration !== null) {
        throw new Error("Two celebrations cannot happen in the same time!"); //Todo: add a priority prop on celebrations to avoid this
      }
      this.actualCelebration = celebration;
    }
  }
}

const celebrations: Celebration[] = [new Christmas(), new NewYear()];

export default new Celebrant(celebrations);
