import { UseCase, FilterState } from "@/types";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function filterUseCases(usecases: UseCase[], filters: FilterState): UseCase[] {
  return usecases.filter((usecase) => {
    // Filter by input category
    if (filters.input !== "All" && usecase.input !== filters.input) {
      return false;
    }

    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(usecase.category)) {
      return false;
    }

    // Filter by personas
    if (filters.personas.length > 0) {
      const hasPersona = filters.personas.some((persona) =>
        usecase.persona_relevance.some(p => p.toLowerCase().includes(persona.toLowerCase()))
      );
      if (!hasPersona) return false;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        usecase.title.toLowerCase().includes(query) ||
        usecase.description.toLowerCase().includes(query) ||
        usecase.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        usecase.potentialCustomers.some((customer) => customer.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    return true;
  });
}

export function getUniqueCategories(usecases: UseCase[]): string[] {
  const categories = new Set<string>();
  usecases.forEach((usecase) => {
    categories.add(usecase.category);
  });
  return Array.from(categories).sort();
}

export function getUniquePersonas(usecases: UseCase[]): string[] {
  const personas = new Set<string>();
  usecases.forEach((usecase) => {
    usecase.persona_relevance.forEach((persona) => personas.add(persona));
  });
  return Array.from(personas).sort();
}
