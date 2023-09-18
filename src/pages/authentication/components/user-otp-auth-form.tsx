import { SyntheticEvent, useRef, useState } from "react";
import { AlertError } from "@/components/alerts/alert-error";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface UserAuthOtpFormProps extends React.HTMLAttributes<HTMLDivElement> {
  signInUserOtp: (email: string) => Promise<void>,
}

export function UserAuthOtpForm({ className, signInUserOtp, ...props }: UserAuthOtpFormProps) {
  const emailOtpRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()

    try {
      setIsLoading(true)
      if (0 === emailOtpRef?.current?.value.length) {
        throw new Error('Please fill in the required fields');
      }
      await signInUserOtp(emailOtpRef.current!.value);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        console.log('Unexpected error', error);
      }
    }
    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="my@mail-otp.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              ref={emailOtpRef}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in with OTP
          </Button>
          <div className="h-20">
            {errorMsg.length > 0 && AlertError({ title: 'Error', description: errorMsg })}
          </div>
        </div>
      </form>
    </div>
  );
}
