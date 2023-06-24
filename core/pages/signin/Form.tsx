"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import signupCover from "@assets/images/welcome-to-signup.png";
import { Button, Divider, Separator } from "@/src/components";
import { TextInput, useFormContext } from "@/src/components/activeform";
import { useRouter } from "next/navigation";
import { useMutation } from "@/src/hooks/useMutation";

import { Toast } from "flowbite-react";
import { useLoadingContext } from "@/src/contexts/LoadingContext";

const Form = () => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const { save } = useMutation({
    resource: "user/login",
    pks: [],
  });
  const { form } = useFormContext()
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingContext();

  const onLogin = async () => {
    showLoadingOverlay();
    try {
      const result = await save({
        data: {
          ...form
        },
      });
      router.push("/dashboard");
      localStorage.setItem("sev_user_login", JSON.stringify(result));
    } catch (error) {
      setError(true);
    } finally {
      hideLoadingOverlay();
      // setError(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1000)
    }
  }, [error])

  return (
    <div className="relative">
      {error && (
        <div className="mt-8 absolute top-0 right-0 left-0 ml-8">
          <Toast>
            <div className="text-sm font-normal text-red-500">
              Login Failed.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-80">
          <div className="mx-auto w-full max-w-lg">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl text-extrabold text-white">
                Welcome to F Learning
              </h2>
              <span className="text-gray-400">Get started - it's free</span>

              <div className="w-full">
                <div className="mt-8">
                  <TextInput label="Username" source="username" />
                  <TextInput label="Password" source="password" />
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    btnType="primary"
                    label="Sign in"
                    className="w-full flex items-center justify-center"
                    onClick={onLogin}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
