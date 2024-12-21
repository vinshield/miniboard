"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { default as TikTokIcon } from "@/public/assets/icons/tiktok.svg";
import { default as GoogleIcon } from "@/public/assets/icons/google.svg";
import { cn } from "@/lib/utils";

import { UsernameForm } from "./UsernameForm";

export function SignUpOptions({ username, onSignUpComplete, changeUsername }) {
  return (
    <>
      <div className="flex h-[80vh] flex-col justify-center">
        <p className="mb-2 text-grey-500">
          Great! <span className="text-primary">{username}.miniboard.site</span>{" "}
          is yours
        </p>
        <div className="grid w-full items-center sm:justify-center">
          <SignUp.Root>
            <Clerk.Loading>
              {(isGlobalLoading) => (
                <>
                  <SignUp.Step name="start">
                    <UsernameForm />
                    <SignUp.Captcha className="empty:hidden" />
                    <SignUp.Action submit asChild>
                      <Button
                        disabled={isGlobalLoading}
                        size="lg"
                        className="min-w-2/5 mt-6 rounded-lg px-6 py-7"
                      >
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              "Create Account"
                            );
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignUp.Action>
                  </SignUp.Step>

                  <SignUp.Step name="continue">
                    <h2 className="leading-12 mb-16 block text-3xl font-semibold tracking-tighter md:text-4xl">
                      Now, create your account
                    </h2>
                    <div className="my-4 grid gap-y-4">
                      <div className="grid grid-cols-2 gap-x-4">
                        <Clerk.Connection name="tiktok" asChild>
                          <Button
                            size="lg"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading scope="provider:github">
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <i className="ci ci-tiktok ci-2x"></i>
                                    <TikTokIcon className="mr-2 size-4" />
                                    TikTok
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                        <Clerk.Connection name="google" asChild>
                          <Button
                            size="lg"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading scope="provider:google">
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <GoogleIcon className="mr-2 size-4" />
                                    Google
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                      </div>
                      <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        or
                      </p>
                      <Clerk.Field name="emailAddress" className="space-y-2">
                        <Clerk.Input type="email" required asChild>
                          <Input
                            className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                            placeholder="Email address"
                          />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Input type="password" required asChild>
                          <Input
                            className="input-field min-w-[20px] rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
                            placeholder="Password"
                          />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </div>

                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          size="lg"
                          className="min-w-2/5 mt-6 rounded-lg px-6 py-7"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Create Account"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                    <div className="flex-center mt-20">
                      <Button variant="link" size="sm" asChild>
                        <Clerk.Link navigate="sign-in">
                          Already have an account? Log in
                        </Clerk.Link>
                      </Button>
                    </div>
                  </SignUp.Step>

                  <SignUp.Step name="verifications">
                    <SignUp.Strategy name="email_code">
                      <Card className="w-full sm:w-96">
                        <CardHeader>
                          <CardTitle>Verify your email</CardTitle>
                          <CardDescription>
                            Use the verification link sent to your email address
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-y-4">
                          <div className="grid items-center justify-center gap-y-2">
                            <Clerk.Field name="code" className="space-y-2">
                              <Clerk.Label className="sr-only">
                                Email address
                              </Clerk.Label>
                              <div className="flex justify-center text-center">
                                <Clerk.Input
                                  type="otp"
                                  className="flex justify-center has-[:disabled]:opacity-50"
                                  autoSubmit
                                  render={({ value, status }) => {
                                    return (
                                      <div
                                        data-status={status}
                                        className={cn(
                                          "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                          {
                                            "z-10 ring-2 ring-ring ring-offset-background":
                                              status === "cursor" ||
                                              status === "selected",
                                          },
                                        )}
                                      >
                                        {value}
                                        {status === "cursor" && (
                                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }}
                                />
                              </div>
                              <Clerk.FieldError className="block text-center text-sm text-destructive" />
                            </Clerk.Field>
                            <SignUp.Action
                              asChild
                              resend
                              className="text-muted-foreground"
                              fallback={({ resendableAfter }) => (
                                <Button variant="link" size="sm" disabled>
                                  Didn&apos;t receive a code? Resend (
                                  <span className="tabular-nums">
                                    {resendableAfter}
                                  </span>
                                  )
                                </Button>
                              )}
                            >
                              <Button type="button" variant="link" size="sm">
                                Didn&apos;t receive a code? Resend
                              </Button>
                            </SignUp.Action>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignUp.Action submit asChild>
                              <Button disabled={isGlobalLoading}>
                                <Clerk.Loading>
                                  {(isLoading) => {
                                    return isLoading ? (
                                      <Icons.spinner className="size-4 animate-spin" />
                                    ) : (
                                      "Continue"
                                    );
                                  }}
                                </Clerk.Loading>
                              </Button>
                            </SignUp.Action>
                          </div>
                        </CardFooter>
                      </Card>
                    </SignUp.Strategy>
                  </SignUp.Step>
                </>
              )}
            </Clerk.Loading>
          </SignUp.Root>
        </div>
      </div>
    </>
  );
}
