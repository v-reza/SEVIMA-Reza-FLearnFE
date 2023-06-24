import { Button } from "@/src/components";
import SlideOver from "@/src/components/SlideOver";
import { TextInput, useFormContext } from "@/src/components/activeform";
import { useLoadingContext } from "@/src/contexts/LoadingContext";
import useGet from "@/src/hooks/useGet";
import useList from "@/src/hooks/useList";
import useOpenAI from "@/src/hooks/useOpenAI";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailTask = () => {
  const params = useParams();
  const { setForm, form } = useFormContext();
  const [show, setShow] = useState<boolean>(false);
  const data = useGet({
    resource: `task/${params.id}`,
    pks: [],
  });
  const router = useRouter()
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

  console.log(dataAI);

  useEffect(() => {
    setForm(data.datas);
  }, [JSON.stringify(data.datas)]);

  return (
    <>
      <div className="flex gap-2">
        <Button btnType="danger" label="Back" onClick={() => router.push('/dashboard')}/>
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
      <div className="w-full bg-[#292F4C] rounded-md mt-4">
        <div className="px-10 py-6 flex items-center justify-between">
          <h3 className="text-white text-bold text-lg">Detail Task</h3>
          <Button btnType="primary" label="Submit" />
        </div>
        <div className="px-10 py-6">
          <div className="flex items-center gap-6">
            <h2 className="text-white text-semibold text-md">
              Task Name - {form.task_name}
            </h2>
            {/* <span className="text-white text-md">}</span> */}
          </div>
        </div>
        <p></p>
        <div className="p-20"></div>
      </div>
    </>
  );
};

export default DetailTask;
