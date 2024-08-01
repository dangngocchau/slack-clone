"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { z } from "zod";
import { FormSchema } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { MdOutlineAutoAwesome } from "react-icons/md";

const AuthPage = () => {
   const [isAuthenticating, setIsAuthenticating] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .min(2, { message: "Email is required" }),
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Slackzz" variant="h2" />
        </div>
        <Typography
          text="Sign in to your Slackzz"
          variant="h2"
          className="mb-3"
        />
        <Typography
          text="We suggest using email address that you use at work"
          variant="p"
          className="opacity-90 mb-7"
        />
        <div className="flex flex-col space-y-4">
          <Button disabled={isAuthenticating} variant="outline" className="py-6 border-2 flex space-x-3">
            <FcGoogle size={30} />
            <Typography
              className="text-xl"
              text="Sign in with Google"
              variant="p"
            />
          </Button>
          <Button disabled={isAuthenticating} variant="outline" className="py-6 border-2 flex space-x-3">
            <RxGithubLogo size={30} />
            <Typography
              className="text-xl"
              text="Sign in with Github"
              variant="p"
            />
          </Button>
        </div>
        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>
          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@work-email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="secondary"
                  type="submit"
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                >
                  <Typography text="Sign in with Email" variant="p" />
                </Button>

                <div className="px-5 py-4 bg-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a magic link for a password-free sign-in"
                      variant="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
