import axios from "axios";
import { useState } from "react";
import React from "react";

type Props = {
  content: string;
};

const useOpenAI = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const AuthorizationToken =
    "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";

  const send = async (content: string) => {
    setLoading(true)
    setData((oldData: any[]) => {
      return [
        ...oldData,
        {
          role: "user",
          content: content,
        }
      ]
    })
    try {
      await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: content,
          }]
        },
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      ).then((res) => {
        const choices = res.data.choices[0]
        const message = choices.message.content
        setData((oldData: any[]) => {
          return [
            ...oldData,
            {
              role: "bot",
              content: message,
            }
          ]
        })
        setLoading(false)
      });
    } catch (error) {
      setError(error)
    }
  };

  const clear = () => {
    setData([])
  }

  return {
    data,
    loading,
    error,
    send,
    clear
  };
};

export default useOpenAI;
