import { createMemoryHistory } from "history";

const routeComponentPropsFixture = {
  history: createMemoryHistory(),
  location: "" as any,
  match: {} as any,
  staticContext: {} as any,
};

export { routeComponentPropsFixture };
