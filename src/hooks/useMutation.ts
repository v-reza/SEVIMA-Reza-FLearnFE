import { API_BASE_URL } from "../config/env";
import { useCallback, useState } from "react";
import _ from "lodash";

export type Props = {
  resource: string;
  pks: string[];
  baseUrl?: string;
};
export type SaveProps = {
  data: any;
  resource?: string;
  pks?: string[];
  replace?: boolean;
  beforeSave?: (e: any) => Promise<any> | undefined;
  createTimeStamp?: string;
  updateTimeStamp?: string;
};

export function useMutation<T>(props: Props) {
  const [datas, setDatas] = useState<T | null>(null);
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const save = useCallback(
    async (saveProps: SaveProps) => {
      const { resource, pks, data, replace } = saveProps;
      const { baseUrl = API_BASE_URL } = props;
      setLoading(true);
      const finalResource = resource ?? props.resource;
      const finalPks = pks ?? props.pks;
      try {
        let res = null;
        if (data._id_) {
          if (replace) {
            await fetch(
              `${baseUrl}${finalResource}/${finalPks
                .map((e) => _.get(data._id_, e))
                .join("/")}`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              }
            ).then((response) => response.json());

            const beforeSave = saveProps.beforeSave
              ? await saveProps.beforeSave(data)
              : data;
            const date = new Date();
            await fetch(`${baseUrl}${finalResource}`, {
              method: "post",
              body: JSON.stringify({
                ...beforeSave,
                ...(saveProps.updateTimeStamp
                  ? {
                      [saveProps.updateTimeStamp]: date.toUTCString(),
                    }
                  : {}),
              }),
              headers: { "Content-Type": "application/json" },
            }).then((response) => response.json());
          } else {
            if (data["_delete_"]) {
              res = await fetch(
                `${baseUrl}${finalResource}/${finalPks
                  .map((e) => _.get(data._id_, e))
                  .join("/")}`,
                {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                }
              ).then((response) => response.json());
            } else {
              const beforeSave = saveProps.beforeSave
                ? await saveProps.beforeSave(data)
                : data;
              const date = new Date();
              res = await fetch(
                `${baseUrl}${finalResource}/${finalPks
                  .map((e) => _.get(data._id_, e))
                  .join("/")}`,
                {
                  method: "PATCH",
                  body: JSON.stringify({
                    ...beforeSave,
                    ...(saveProps.updateTimeStamp
                      ? {
                          [saveProps.updateTimeStamp]: date.toUTCString(),
                        }
                      : {}),
                  }),
                  headers: { "Content-Type": "application/json" },
                }
              );
              console.log(res);
              if (!res.ok) {
                throw await res.json();
              }
              setLoading(false);
              return res.json();
            }
          }
        } else {
          const beforeSave = saveProps.beforeSave
            ? await saveProps.beforeSave(data)
            : data;
          const date = new Date();
          res = await fetch(`${baseUrl}${finalResource}`, {
            method: "post",
            body: JSON.stringify({
              ...beforeSave,
              ...(saveProps.createTimeStamp
                ? {
                    [saveProps.createTimeStamp]: date.toUTCString(),
                  }
                : {}),
              ...(saveProps.updateTimeStamp
                ? {
                    [saveProps.updateTimeStamp]: date.toUTCString(),
                  }
                : {}),
            }),
            headers: { "Content-Type": "application/json" },
          });
          console.log(res);
          if (!res.ok) {
            throw await res.json();
          }
          setLoading(false);
          return res.json();
        }
        setDatas(res);
        setLoading(false);
        return res;
      } catch (error) {
        console.log("save error", error);
        setErrors(error);
        setLoading(false);
        throw error;
      }
    },
    [props.resource]
  );
  return {
    loading,
    datas,
    errors,
    save,
  };
}
