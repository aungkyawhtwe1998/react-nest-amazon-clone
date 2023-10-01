import { validateNameLength, validatePasswordLength } from "./length";

describe("Field Length validation", () => {
  describe("Name Field", () => {
    let name = "";

    test("a name should fail length validation", () => {
      expect(validateNameLength(name)).toEqual(false);
    });

    test("a name should fail length validation if it is less than 2 characters", () => {
      name = "J";
      expect(validateNameLength(name)).toEqual(false);
    });

    test("a name should pass length validation if it is  2 characters", () => {
      name = "JK";
      expect(validateNameLength(name)).toEqual(true);
    });
  });

  describe("Password Field", () => {
    let password = "";

    test("a password should fail lenth validtion", () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test("a password should fail length validation if it is less than 2 characters", () => {
      password = "1";
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test("a password should fail length validation if it is more than 20 characters", () => {
        password = "1adkfasldkfasldfjasldkfjalskdfasldkfjalskdjfa";
        expect(validatePasswordLength(password)).toEqual(false);
      });

    test("a password should pass length validation if it is 6 - 20 characters", () => {
      password = "password";
      expect(validatePasswordLength(password)).toEqual(true);
    });
  });
});
