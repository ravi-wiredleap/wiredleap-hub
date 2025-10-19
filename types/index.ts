export interface UseCase {
  id: string;
  title: string;
  input: "Visual" | "Audio" | "Social Media" | "Text" | "Sensors (IoT, GIS)";
  category: string;
  description: string;
  beneficiaries: string[];
  potentialCustomers: string[];
  tags: string[];
  persona_relevance: string[];
  demoAsset: string;
  videoUrl?: string;
  outputs: string[];
  integration: {
    edge: boolean;
    pulse: boolean;
    sentinel: boolean;
  };
}

export interface UseCasesData {
  usecases: UseCase[];
}

export type InputCategory = "Visual" | "Audio" | "Social Media" | "Text" | "Sensors (IoT, GIS)" | "All";

export type PersonaType = "Police" | "City Planner" | "Facility Manager" | "Conservation Officer" | "Enterprise CIO" | "Healthcare Manager";

export interface FilterState {
  input: InputCategory;
  categories: string[];
  personas: string[];
  searchQuery: string;
}
