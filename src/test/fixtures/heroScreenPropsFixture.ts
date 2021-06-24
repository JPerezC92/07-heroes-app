import { createMemoryHistory } from "history";

const heroScreenPropsFixture = {
  history: createMemoryHistory(),
  location: "" as any,
  match: {} as any,
  staticContext: {} as any,
};

export { heroScreenPropsFixture };
