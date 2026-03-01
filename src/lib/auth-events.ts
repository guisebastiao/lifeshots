import mitt from "mitt";

type AuthEvents = {
  "auth:logout": void;
  "auth:refresh": void;
};

export const authEmitter = mitt<AuthEvents>();
