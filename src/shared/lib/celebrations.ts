import Snowfall from "react-snowfall";

interface Celebration {
  isTimeToCelebrate: () => boolean;
}

class Christmas implements Celebration {
  isTimeToCelebrate() {
    return new Date().getMonth() === 11; //December is the 11 month
  }
  snowFall() {
    return Snowfall;
  }
}

class Celebrant {
  actualCelebration: Celebration | null = null;
  constructor(celebrations: Celebration[]) {
    for (const celebration of celebrations) {
      if (!celebration.isTimeToCelebrate()) {
        return;
      }
      if (this.actualCelebration !== null) {
        throw new Error("Two celebrations cannot happen in the same time!");
      } else {
      }
    }
  }
}

const celebrations: Celebration[] = [new Christmas()];

export default new Celebrant(celebrations);
