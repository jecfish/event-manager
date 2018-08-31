interface People {
  seq: string;
  name: string;
  email: string;
  pid: string;
  gender: string;
  shirt: string;
  survey: boolean;

  isGotCheck?: boolean;
  isGotShirt?: boolean;
  isGotLucky?: boolean;
  isGotCheckDeq?: boolean;

  isGotCheckBy?: boolean;
  isGotShirtBy?: string;
  isGotLuckyBy?: string;
  isGotCheckDeqBy?: string;

  timeGotCheck?: string;
  timeGotShirt?: string;
  timeGotLucky?: string;
  timeGotCheckDeq?: string;
}

interface Item {
  status: string;
  data?: People;
  error?: any;
}

interface CheckConfig {
  type?: string;
  lblYes?: string;
  boolKey?: string; 
}

interface Right {
  name: string;
  user: string;
  access: string[];
}

interface Grant {
  name: string;
  email: string;
  password: string;
  access?: string[];
}

interface Login {
  email: string;
  password: string;
}

interface Result {
  status?: string;
  data?: any;
  error?: any;
}

interface TotalPeople {
  count: number;
}