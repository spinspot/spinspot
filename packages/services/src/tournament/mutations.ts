import {
    ITournament, 
    TCreateTournamentInputDefinition
} from '@spin-spot/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from "../api";

export async function createTournament(input: TCreateTournamentInputDefinition) {
    const res = await api.post('/tournaments', { body: input });
    const tournament: ITournament = await res.json();
    return tournament;
}

export function useCreateTournament() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createTournament'],
        mutationFn: createTournament,

        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['getTournaments'] });
            queryClient.invalidateQueries({ queryKey: ['getTournament', data._id] });
        }
    });
}

