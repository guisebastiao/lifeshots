import mitt from "mitt";

type Events = {
  authenticate: void;
  deauthenticate: void;
};

export const eventBus = mitt<Events>();
