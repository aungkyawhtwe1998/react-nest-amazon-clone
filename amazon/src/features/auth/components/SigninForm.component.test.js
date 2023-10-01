import SigninFormComponent from "./SigninForm.component";
import { reducer, screen } from "../../../shared/utils/test-utils";
describe("Sign-in Form", () => {
  let signInButton = null;
  berforeEach(() => {
    reducer(<SigninFormComponent />);
    signInButton = screen.getByRole("button", { name: /sign-in/i });

    test("The login button should be in the document", () => {
      expect(signInButton).toBeInTheDocument();
    });

    test("The login button should initially be disabled", () => {
      expect(signInButton).toBeDisabled();
    });
  });
});
