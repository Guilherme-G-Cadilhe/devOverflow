import { SignIn } from "@clerk/nextjs";

// Naming folder as [[...sign-in]] Convention is obrigatory for @Clerk
const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
