import { appActions, appReducer } from "app/model/appSlice";
import { authSlice, authThunks } from "features/auth/model/auth.slice";

let startState: { isLoggedIn: boolean };

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("user should be logged", () => {
  const args = {
    email: "boxunbox@mail.ru",
    password: "qwerty",
    rememberMe: false,
  };

  const endState = authSlice(
    startState,
    authThunks.login.fulfilled({ isLoggedIn: true }, "requestId", args),
  );

  expect(endState.isLoggedIn).toBe(true);
});

// it("should update isLoggedIn to true on login fulfilled", () => {
//   store.dispatch(authThunks.login()); // Dispatch login action
//   expect(store.getState().auth.isLoggedIn).toBe(true);
// });

test("should update isLoggedIn to false on logout fulfilled", () => {
  const endState2 = authSlice(
    startState,
    authThunks.logout.fulfilled({ isLoggedIn: false }, "requestId"),
  );
  expect(endState2.isLoggedIn).toBe(false);
});
