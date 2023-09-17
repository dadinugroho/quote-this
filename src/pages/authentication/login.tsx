import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { Logo } from "@/components/logo";
import { UserAuthForm } from "@/pages/authentication/components/user-auth-form";

const Login = () => {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();

  const signInUser = async (email: string, password: string) => {
    const {
      data: { user, session },
      error
    } = await signIn(email, password);

    if (error) throw new Error(error.message);

    if (user && session) navigate("/");
  }

  useEffect(() => {
    // Do not allow to relogin if session is still active!
    if (session) navigate('/')
  }, [])

  return (
    <>
      <div className="container relative sm:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="hidden h-full flex-col bg-primary p-10 text-white dark:border-r lg:flex">
          <Logo />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Estimate yout Furniture project budget before starting it..&rdquo;
              </p>
              <footer className="text-sm">quoteThis!</footer>
            </blockquote>
          </div>
        </div>
        <div className="h-full flex flex-col items-center justify-center pt-4 md:p-8">
          <div className="self-end">
            <ModeToggle />
          </div>
          <div className="mx-auto flex-grow flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to quoteThis!
              </h1>
              <p className="text-sm text-muted-foreground">
                Please enter your email and password to login.
              </p>
            </div>
            <UserAuthForm signInUser={signInUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
