import { gql, useQuery } from "@apollo/client";

export const useGetAllTodos = (literals?: string[]) => {
  const customQuery = literals?.join(" ");
  const result = useQuery(gql`
  query Todos {
    getAll {${literals ? customQuery : `uuid title done userId updatetAt`}
    }
  }
`);
  return { ...result, data: result?.data?.getAll ?? result?.data };
};
