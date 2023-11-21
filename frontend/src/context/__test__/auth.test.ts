import { Role } from "@/hooks/useRoleAccess";
import { useAuth } from "../auth";

test("AuthProvider should provide user, isLoggedIn, login, logout, and setUser props to children", () => {
  const { user, isLoggedIn, login, logout, setUser } = useAuth();

  expect(user).toBeInstanceOf(Object);
  expect(user?.email).toBe("bohorquez866@gmail.com");
  expect(user?.role).toBe(Role.SUPERUSER);

  expect(isLoggedIn).toBe(true);

  login();
  expect(isLoggedIn).toBe(true);

  logout();
  expect(isLoggedIn).toBe(false);

  setUser({
    english_level: "B2",
    role: Role.USER,
    email: "johndoe@example.com",
    image_url: "https://example.com/avatar.png",
    cv_url: "https://example.com/cv.pdf",
    username: "johndoe",
    name: "John Doe",
    team: "Beta Corporation",
  });

  expect(user?.english_level).toBe("B2");
  expect(user?.role).toBe(Role.USER);
  expect(user?.email).toBe("johndoe@example.com");
  expect(user?.image_url).toBe("https://example.com/avatar.png");
  expect(user?.cv_url).toBe("https://example.com/cv.pdf");
  expect(user?.username).toBe("johndoe");
  expect(user?.name).toBe("John Doe");
  expect(user?.team).toBe("Beta Corporation");
});

test("useAuth should throw an error if used outside of an AuthProvider component", () => {
  expect(() => useAuth()).toThrowError(
    "AuthContext must be used within an AuthProvider component"
  );
});
