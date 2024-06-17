import {
  ITournamentMatch,
  TCreateTournamentMatchInputDefinition,
} from "@spin-spot/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export async function createTournamentMatch(
  input: TCreateTournamentMatchInputDefinition,
) {
  const res = await api.post("/tournament-matches", { body: input });
  const tournamentMatch: ITournamentMatch = await res.json();
  return tournamentMatch;
}

export function useCreateTournamentMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTournamentMatch"],
    mutationFn: createTournamentMatch,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getTournamentMatches"] });
    },
  });
}

export async function updateTournamentMatch({
  _id,
  ...input
}: {
  _id: string;
} & TCreateTournamentMatchInputDefinition) {
  const res = await api.put(
    "/tournament-matches/" + encodeURIComponent(`${_id}`),
    {
      body: input,
    },
  );
  const tournamentMatch: ITournamentMatch = await res.json();
  return tournamentMatch;
}

export function useUpdateTournamentMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTournamentMatch"],
    mutationFn: updateTournamentMatch,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["getTournamentMatches"] });
      queryClient.invalidateQueries({
        queryKey: ["getTournamentMatch", data._id],
      });
    },
  });
}
