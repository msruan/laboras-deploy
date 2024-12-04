import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Função genérica para filtrar propriedades de um objeto, removendo aquelas cujo valor é undefined
 * ou são strings vazias (ou que contêm apenas espaços em branco).
 *
 * @param obj - O objeto a ser filtrado.
 * @returns Um novo objeto contendo apenas as propriedades definidas e não vazias.
 */
export function filterUndefinedOrEmptyStringProperties<T>(obj: T): Partial<T> {
  const filteredObject: Partial<T> = {};

  for (const key in obj) {
      const value = obj[key];

      // Verifica se o valor não é undefined e, se for string, se não está vazia
      if (value !== undefined && !(typeof value === 'string' && value.trim() === '')) {
          filteredObject[key] = value;
      }
  }

  return filteredObject;
}