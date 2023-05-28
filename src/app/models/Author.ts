import {Poem} from "./Poem";
import {Chronograph} from "./Chronograph";

export interface Author {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      description: string;
      dateBirth: Date;
      dateDeath: Date;
      chronogrof: Chronograph[];
      poems: Poem[];
}
