import { useEffect, useState } from "react";

/**
 * useDebounce hook
 * Este hook permite debouncing de qualquer valor que muda rapidamente.
 * O valor debounced só refletirá o valor mais recente quando o hook não tiver sido chamado por um período de atraso especificado.
 *
 * @param value - O valor a ser debounced.
 * @param delay - O atraso em milissegundos para o debounce.
 * @returns O valor debounced.
 */
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Atualiza o valor debounced após o atraso especificado
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancela o timeout se o valor mudar (também ao mudar o atraso ou desmontar)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Re-executa o efeito se value ou delay mudarem

    return debouncedValue;
}

export default useDebounce;
