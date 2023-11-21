const emailRegex = new RegExp(/^([a-z0-9_\.-]+)@(([a-z0-9-]+\.)+[a-z]{2,})$/);

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

const GdriveRegex =
  /(https?:\/\/)?(?:drive\.google\.com\/file\/d\/([^/]+)|docs\.google\.com\/document\/d\/([^/]+))(?::[-\w]+)?\/?$/;

export { emailRegex, passwordRegex, GdriveRegex };
