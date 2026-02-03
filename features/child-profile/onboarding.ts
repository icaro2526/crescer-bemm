export type QuizStep = {
  id: string;
  section: string;
  label: string;
  type: "text" | "date" | "number" | "select" | "info";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

export const onboardingSteps: QuizStep[] = [
  {
    id: "childName",
    section: "Child basic info",
    label: "Child name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    id: "birthDate",
    section: "Child basic info",
    label: "Birth date",
    type: "date",
  },
  {
    id: "gender",
    section: "Child basic info",
    label: "Gender (optional)",
    type: "select",
    optional: true,
    options: ["Female", "Male", "Another", "Prefer not to say"],
  },
  {
    id: "currentAge",
    section: "Current age",
    label: "Calculated age",
    type: "info",
  },
  {
    id: "weightKg",
    section: "Weight",
    label: "Current weight in kg (optional)",
    type: "number",
    optional: true,
    placeholder: "e.g. 14.5",
  },
  {
    id: "sleepBedtime",
    section: "Sleep routine",
    label: "Typical bedtime",
    type: "select",
    options: ["Before 8pm", "8-9pm", "9-10pm", "After 10pm", "Varies"],
  },
  {
    id: "sleepNightWakings",
    section: "Sleep routine",
    label: "Night wakings",
    type: "select",
    options: ["None", "1-2 times", "3+ times", "Varies"],
  },
  {
    id: "feedingMeals",
    section: "Feeding routine",
    label: "Meals per day",
    type: "select",
    options: ["2-3 meals", "4-5 meals", "6+ meals", "Varies"],
  },
  {
    id: "feedingAppetite",
    section: "Feeding routine",
    label: "Appetite level",
    type: "select",
    options: ["Good appetite", "Picky eater", "Varies"],
  },
  {
    id: "screenTimeDaily",
    section: "Screen time exposure",
    label: "Daily screen time",
    type: "select",
    options: ["0-30 minutes", "30-60 minutes", "1-2 hours", "2+ hours", "Varies"],
  },
  {
    id: "screenTimePrimary",
    section: "Screen time exposure",
    label: "Primary screen type",
    type: "select",
    options: ["TV", "Tablet", "Phone", "Mixed", "Not sure"],
  },
  {
    id: "communicationSpeech",
    section: "Communication and interaction",
    label: "Speech and language",
    type: "select",
    options: [
      "Not talking yet",
      "A few words",
      "Short phrases",
      "Full sentences",
      "Varies",
    ],
  },
  {
    id: "communicationSocial",
    section: "Communication and interaction",
    label: "Comfort with social interaction",
    type: "select",
    options: ["Enjoys it", "Sometimes", "Prefers solo", "Varies"],
  },
  {
    id: "behaviorTantrums",
    section: "Behavior indicators",
    label: "Tantrum frequency",
    type: "select",
    options: ["Rare", "Weekly", "Daily", "Varies"],
  },
  {
    id: "behaviorTransitions",
    section: "Behavior indicators",
    label: "Transitions between activities",
    type: "select",
    options: ["Easy", "Some difficulty", "Often hard", "Varies"],
  },
  {
    id: "behaviorSensory",
    section: "Behavior indicators",
    label: "Sensitivity to sounds or textures",
    type: "select",
    options: ["None", "Some", "Strong", "Not sure"],
  },
];
