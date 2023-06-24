import { Button } from "@/src/components";
import SlideOver from "@/src/components/SlideOver";
import {
  TextAreaInput,
  TextInput,
  useFormContext,
} from "@/src/components/activeform";
import { useLoadingContext } from "@/src/contexts/LoadingContext";
import { useUserContext } from "@/src/contexts/UserContext";
import useGet from "@/src/hooks/useGet";
import useList from "@/src/hooks/useList";
import { useMutation } from "@/src/hooks/useMutation";
import useOpenAI from "@/src/hooks/useOpenAI";
import clsx from "clsx";
import { Toast } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const DetailTask = () => {
  const params = useParams();
  const { setForm, form } = useFormContext();
  const { user } = useUserContext();
  console.log(user)
  const [showToast, setShowToast] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const data = useGet({
    resource: `task/${params.id}`,
    pks: [],
  });
  const { save } = useMutation({
    resource: "task",
    pks: ["_id"],
  });
  const router = useRouter();
  const { data: dataAI, send, clear } = useOpenAI();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingContext();

  const onSendAsk = async () => {
    showLoadingOverlay();
    try {
      await send(form.ask_to_gpt);
    } catch (error) {
    } finally {
      hideLoadingOverlay();
      setForm((oldForm: any) => {
        return {
          ...oldForm,
          ask_to_gpt: "",
        };
      });
    }
  };

  useEffect(() => {
    setForm(data.datas);
  }, [JSON.stringify(data.datas)]);

  const isAlreadySubmit = useMemo(() => {
    let disable = false;
    let content = null
    const { user_answer_task = null } = form;

    if (user_answer_task) {
      const answer = JSON.parse(user_answer_task);
      console.log(answer);
      if (answer && answer.length > 0) {
        const userAnswer = answer.find((e: any) => e.user_id === user._id);
        if (userAnswer) {
          disable = true;
          content = userAnswer.answer
        }
      }
    }
    return { disable, content };
  }, [JSON.stringify(form), JSON.stringify(user)]);

  const onSubmitAnswer = async () => {
    showLoadingOverlay();
    try {
      const { user_answer_task = null } = form;
      let listAnswer: any[] = [];
      if (user_answer_task) {
        const answer = JSON.parse(user_answer_task);
        answer &&
          answer.length > 0 &&
          answer.map((e: any) => {
            listAnswer.push(e);
          });
      }

      listAnswer = [
        ...listAnswer,
        {
          answer: form.task_answer,
          user_id: user._id,
        },
      ];

      await save({
        data: {
          user_answer_task: JSON.stringify(listAnswer),
          _id_: {
            _id: params.id,
          },
        },
      });
      data.reload();
    } catch (error) {
    } finally {
      hideLoadingOverlay();
    }
  };

  return (
    <>
      {showToast && (
        <div className="mt-8 absolute top-0 right-0 left-0 ml-8">
          <Toast>
            <div className="text-sm font-normal text-red-500">
              You already answer this task.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      <div className="flex gap-2">
        <Button
          btnType="danger"
          label="Back"
          onClick={() => {
            router.push("/dashboard");
            setForm({});
          }}
        />
        <Button
          btnType="info"
          label="Ask to GPT"
          onClick={() => setShow(true)}
        />
      </div>
      <SlideOver title="Ask to GPT" show={show} onClose={() => setShow(false)}>
        {dataAI &&
          dataAI.map((e: any, index: number) => (
            <div
              key={index}
              className={clsx("flex items-center mt-6", {
                "justify-end": e.role === "bot",
                "justify-start": e.role === "user",
              })}
            >
              <code
                className={clsx("text-md", {
                  "text-white": e.role === "bot",
                  "text-blue-200": e.role === "user",
                })}
              >
                {e.content}
              </code>
            </div>
          ))}
        <TextInput source="ask_to_gpt" label="Message" />
        <div className="flex gap-2">
          <Button btnType="primary" label="Send" onClick={onSendAsk} />
          <Button btnType="warning" label="Clear" onClick={() => clear()} />
        </div>
      </SlideOver>
      <div className="w-full bg-[#292F4C] rounded-md mt-4 pb-4">
        <div className="px-10 py-6 flex items-center justify-between">
          <h3 className="text-white text-bold text-lg">Detail Task</h3>
        </div>
        <div className="px-10 py-6">
          <div className="flex items-center gap-6">
            <h2 className="text-white text-semibold text-md">
              Task Name - {form.task_name}
            </h2>
          </div>
          <div className="mt-4">
            <h2 className="text-white text-semibold text-md">
              Task Description
            </h2>
            <div className="mt-4">
              <p className="text-white">{form.task_description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#292F4C] rounded-md mt-4 pb-4">
        <div className="px-10 py-6 flex items-center justify-between">
          <h3 className="text-white text-bold text-lg">Your Answer</h3>
          <Button
            btnType="primary"
            label="Submit"
            onClick={onSubmitAnswer}
            disabled={isAlreadySubmit.disable}
          />
        </div>
        {isAlreadySubmit.disable ? (
          <div className="px-10 py-6">
            <p className="text-white">{isAlreadySubmit.content}</p>
          </div>
        ) : (
          <div className="px-10 py-6">
            <TextAreaInput source="task_answer" label="Answer" />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailTask;
