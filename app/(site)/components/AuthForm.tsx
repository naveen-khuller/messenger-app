"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { useCallback, useEffect, useState } from "react";
import Input from "@/app/components/input/Input";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { signIn, useSession } from "next-auth/react";
import { FieldValues, SubmitHandler,useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Variants = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variants, setVariants] = useState<Variants>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }
  , [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variants === 'LOGIN') {
      setVariants('REGISTER');
    } else {
      setVariants('LOGIN');
    }
  }, [variants]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {name: "",email: "",password: ""},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variants === "REGISTER") {
       //axios register
      axios.post('/api/register', data)
      .then(() => signIn('credentials', data))
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
    }
    if (variants === "LOGIN") {
      //nextAuth login

      signIn('credentials', {
        ...data,
        redirect: false,
      })
      .then((callback) => {
            if(callback?.error) return toast.error(callback.error);
            if(callback?.ok && !callback?.error) return toast.success('Successfully logged in');
            router.push("/users");

      })
      .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
    .then((callback) => {
      if(callback?.error) return toast.error(callback.error);
      if(callback?.ok &&  !callback?.error) return toast.success('Successfully logged in');

    })
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variants === 'REGISTER' && (
            <Input disabled={isLoading} register={register} errors={errors} required id="name" label="Name"/>
          )}
          <Input disabled={isLoading} register={register} errors={errors} required id="email" label="Email address" type="email"/>
          <Input disabled={isLoading} register={register} errors={errors} required id="password" label="Password"type="password" />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variants === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>

          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variants === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variants === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
