import { FetchInstance } from "@/helpers/types/enums";

export const fetcher = async (
  url: string,
  method: string,
  data?: object
): Promise<Response> => {
  return await fetch(url, {
    method,
    body: data && JSON.stringify(data),
    headers: {
      "Content-Type": FetchInstance.CONTENT_TYPE_JSON,
    },
  });
};
