import type { SymptomContent, SymptomId } from "./types";

export const symptomContent: Record<SymptomId, SymptomContent> = {
  fever: {
    title: "Fever",
    shortDescription:
      "Educational, non-diagnostic guidance focused on safe monitoring.",
    alerts: {
      default: [],
      infant: [
        "Under 3 months: any fever should be evaluated urgently.",
        "Under 12 months: seek medical advice if fever is present with poor feeding or unusual sleepiness.",
      ],
    },
    sections: {
      observe: {
        default: ["Temperature trend and how long it lasts."],
        infant: [
          "Temperature trend and how long it lasts.",
          "Changes in feeding, hydration, or alertness.",
          "Shivering, sweating, or unusually warm skin.",
        ],
        toddler: [
          "Temperature pattern during the day.",
          "Energy level and comfort.",
          "Hydration and bathroom patterns.",
        ],
        preschool: [
          "Temperature pattern and response to rest.",
          "Participation in play and energy level.",
          "Hydration and bathroom patterns.",
        ],
      },
      common: {
        default: [
          "Everyday factors like routine changes or environmental warmth.",
          "Mild irritants or recent activity.",
        ],
        infant: [
          "Everyday factors like routine changes or environmental warmth.",
          "Recent activity or warm clothing.",
        ],
        toddler: [
          "Everyday factors like active play or warm environments.",
          "Minor irritants in the environment.",
        ],
        preschool: [
          "Everyday factors like active play or warm environments.",
          "Minor irritants in the environment.",
        ],
      },
      monitor: {
        default: [
          "Track temperature readings with times noted.",
          "Observe hydration and urine output.",
          "Note any changes in comfort or activity.",
        ],
        infant: [
          "Track temperature readings with times noted.",
          "Observe wet diapers and feeding patterns.",
          "Note any changes in alertness or comfort.",
        ],
        toddler: [
          "Track temperature readings with times noted.",
          "Observe fluid intake and urine output.",
          "Note any changes in comfort or play.",
        ],
        preschool: [
          "Track temperature readings with times noted.",
          "Observe fluid intake and bathroom patterns.",
          "Note any changes in comfort or energy.",
        ],
      },
      warning: {
        default: [
          "Fever that persists or keeps rising.",
          "Fever with unusual sleepiness or poor intake.",
          "Fever with significant pain or discomfort.",
        ],
        infant: [
          "Fever with poor feeding or fewer wet diapers.",
          "Fever with unusual sleepiness or irritability.",
          "Fever that persists or keeps rising.",
        ],
        toddler: [
          "Fever with reduced drinking or fewer bathroom trips.",
          "Fever with unusual sleepiness or irritability.",
          "Fever that persists or keeps rising.",
        ],
        preschool: [
          "Fever with reduced drinking or fewer bathroom trips.",
          "Fever with unusual sleepiness or irritability.",
          "Fever that persists or keeps rising.",
        ],
      },
      emergency: {
        default: [
          "Difficulty breathing or struggling to breathe.",
          "Unresponsive, very hard to wake, or limp.",
          "Seizure or severe confusion.",
        ],
        infant: [
          "Difficulty breathing or struggling to breathe.",
          "Unresponsive, very hard to wake, or limp.",
          "Seizure or severe confusion.",
        ],
        toddler: [
          "Difficulty breathing or struggling to breathe.",
          "Unresponsive, very hard to wake, or limp.",
          "Seizure or severe confusion.",
        ],
        preschool: [
          "Difficulty breathing or struggling to breathe.",
          "Unresponsive, very hard to wake, or limp.",
          "Seizure or severe confusion.",
        ],
      },
    },
  },
  cough: {
    title: "Cough",
    shortDescription:
      "Educational, non-diagnostic guidance focused on safe monitoring.",
    alerts: {
      default: [],
      infant: [
        "Infants with cough should be monitored for feeding or breathing changes.",
      ],
    },
    sections: {
      observe: {
        default: ["How often the cough happens and its pattern."],
        infant: [
          "How often the cough happens and its pattern.",
          "Any changes in feeding or breathing effort.",
        ],
        toddler: [
          "Cough frequency, especially during sleep.",
          "Energy and comfort during the day.",
        ],
        preschool: [
          "Cough triggers like activity or talking.",
          "Sleep disruption or low energy.",
        ],
      },
      common: {
        default: [
          "Dry air or seasonal changes.",
          "Irritation from dust, smoke, or strong smells.",
        ],
        infant: [
          "Dry air or seasonal changes.",
          "Irritation from dust, smoke, or strong smells.",
        ],
        toddler: [
          "Dry air or seasonal changes.",
          "Irritation from dust, smoke, or strong smells.",
        ],
        preschool: [
          "Dry air or seasonal changes.",
          "Irritation from dust, smoke, or strong smells.",
        ],
      },
      monitor: {
        default: [
          "Track timing of cough episodes.",
          "Note changes in sleep or eating.",
          "Observe comfort during play or rest.",
        ],
        infant: [
          "Track timing of cough episodes.",
          "Note changes in feeding or sleep.",
          "Observe breathing effort.",
        ],
        toddler: [
          "Track timing of cough episodes.",
          "Note changes in sleep or eating.",
          "Observe comfort during play or rest.",
        ],
        preschool: [
          "Track timing of cough episodes.",
          "Note changes in sleep or eating.",
          "Observe comfort during play or rest.",
        ],
      },
      warning: {
        default: [
          "Cough that is persistent or worsening.",
          "Cough that interrupts sleep or eating.",
          "Cough with noticeable breathing effort.",
        ],
        infant: [
          "Cough with reduced feeding or fewer wet diapers.",
          "Cough with noticeable breathing effort.",
          "Cough that is persistent or worsening.",
        ],
        toddler: [
          "Cough with reduced drinking or low energy.",
          "Cough with noticeable breathing effort.",
          "Cough that is persistent or worsening.",
        ],
        preschool: [
          "Cough with reduced drinking or low energy.",
          "Cough with noticeable breathing effort.",
          "Cough that is persistent or worsening.",
        ],
      },
      emergency: {
        default: [
          "Struggling to breathe or breathing very fast.",
          "Bluish lips or skin.",
          "Unable to speak or cry due to breathing trouble.",
        ],
        infant: [
          "Struggling to breathe or breathing very fast.",
          "Bluish lips or skin.",
          "Unable to feed due to breathing trouble.",
        ],
        toddler: [
          "Struggling to breathe or breathing very fast.",
          "Bluish lips or skin.",
          "Unable to speak or cry due to breathing trouble.",
        ],
        preschool: [
          "Struggling to breathe or breathing very fast.",
          "Bluish lips or skin.",
          "Unable to speak or cry due to breathing trouble.",
        ],
      },
    },
  },
  diarrhea: {
    title: "Diarrhea",
    shortDescription:
      "Educational, non-diagnostic guidance focused on safe monitoring.",
    alerts: {
      default: [],
      infant: [
        "Infants can dehydrate quickly. Monitor wet diapers closely.",
      ],
    },
    sections: {
      observe: {
        default: ["Frequency and consistency of stools."],
        infant: [
          "Frequency and consistency of stools.",
          "Changes in feeding or diaper output.",
        ],
        toddler: [
          "Frequency and consistency of stools.",
          "Any belly discomfort or changes in appetite.",
        ],
        preschool: [
          "Frequency and consistency of stools.",
          "Any belly discomfort or changes in appetite.",
        ],
      },
      common: {
        default: [
          "Diet changes or new foods.",
          "Routine changes or mild stomach upset.",
        ],
        infant: [
          "Diet changes or new foods.",
          "Routine changes or mild stomach upset.",
        ],
        toddler: [
          "Diet changes or new foods.",
          "Routine changes or mild stomach upset.",
        ],
        preschool: [
          "Diet changes or new foods.",
          "Routine changes or mild stomach upset.",
        ],
      },
      monitor: {
        default: [
          "Track stool frequency and timing.",
          "Observe hydration and bathroom patterns.",
          "Note energy level and comfort.",
        ],
        infant: [
          "Track stool frequency and timing.",
          "Observe wet diapers and feeding.",
          "Note energy level and comfort.",
        ],
        toddler: [
          "Track stool frequency and timing.",
          "Observe drinking and bathroom patterns.",
          "Note energy level and comfort.",
        ],
        preschool: [
          "Track stool frequency and timing.",
          "Observe drinking and bathroom patterns.",
          "Note energy level and comfort.",
        ],
      },
      warning: {
        default: [
          "Diarrhea that persists or worsens.",
          "Blood in stool or severe belly pain.",
          "Signs of dehydration such as low urine output.",
        ],
        infant: [
          "Diarrhea with fewer wet diapers.",
          "Blood in stool or severe belly pain.",
          "Diarrhea that persists or worsens.",
        ],
        toddler: [
          "Diarrhea with reduced drinking or low energy.",
          "Blood in stool or severe belly pain.",
          "Diarrhea that persists or worsens.",
        ],
        preschool: [
          "Diarrhea with reduced drinking or low energy.",
          "Blood in stool or severe belly pain.",
          "Diarrhea that persists or worsens.",
        ],
      },
      emergency: {
        default: [
          "Very sleepy or hard to wake.",
          "No urine output for a long period.",
          "Severe weakness or collapse.",
        ],
        infant: [
          "Very sleepy or hard to wake.",
          "No wet diapers for a long period.",
          "Severe weakness or collapse.",
        ],
        toddler: [
          "Very sleepy or hard to wake.",
          "No urine output for a long period.",
          "Severe weakness or collapse.",
        ],
        preschool: [
          "Very sleepy or hard to wake.",
          "No urine output for a long period.",
          "Severe weakness or collapse.",
        ],
      },
    },
  },
  vomiting: {
    title: "Vomiting",
    shortDescription:
      "Educational, non-diagnostic guidance focused on safe monitoring.",
    alerts: {
      default: [],
      infant: [
        "Infants can dehydrate quickly. Monitor wet diapers closely.",
      ],
    },
    sections: {
      observe: {
        default: ["How often vomiting occurs and when it happens."],
        infant: [
          "How often vomiting occurs and when it happens.",
          "Changes in feeding or diaper output.",
        ],
        toddler: [
          "How often vomiting occurs and when it happens.",
          "Any belly discomfort or changes in appetite.",
        ],
        preschool: [
          "How often vomiting occurs and when it happens.",
          "Any belly discomfort or changes in appetite.",
        ],
      },
      common: {
        default: [
          "Overeating or eating too quickly.",
          "Motion sensitivity or mild stomach upset.",
        ],
        infant: [
          "Overeating or eating too quickly.",
          "Sensitivity to routine changes.",
        ],
        toddler: [
          "Overeating or eating too quickly.",
          "Motion sensitivity or mild stomach upset.",
        ],
        preschool: [
          "Overeating or eating too quickly.",
          "Motion sensitivity or mild stomach upset.",
        ],
      },
      monitor: {
        default: [
          "Track how often vomiting happens.",
          "Observe hydration and bathroom patterns.",
          "Note energy level and comfort.",
        ],
        infant: [
          "Track how often vomiting happens.",
          "Observe wet diapers and feeding.",
          "Note energy level and comfort.",
        ],
        toddler: [
          "Track how often vomiting happens.",
          "Observe drinking and bathroom patterns.",
          "Note energy level and comfort.",
        ],
        preschool: [
          "Track how often vomiting happens.",
          "Observe drinking and bathroom patterns.",
          "Note energy level and comfort.",
        ],
      },
      warning: {
        default: [
          "Vomiting that is persistent or worsening.",
          "Unable to keep fluids down.",
          "Signs of dehydration such as low urine output.",
        ],
        infant: [
          "Vomiting with fewer wet diapers.",
          "Vomiting that is persistent or worsening.",
          "Unable to keep feeds down.",
        ],
        toddler: [
          "Vomiting with reduced drinking or low energy.",
          "Vomiting that is persistent or worsening.",
          "Unable to keep fluids down.",
        ],
        preschool: [
          "Vomiting with reduced drinking or low energy.",
          "Vomiting that is persistent or worsening.",
          "Unable to keep fluids down.",
        ],
      },
      emergency: {
        default: [
          "Very sleepy or hard to wake.",
          "Severe weakness or collapse.",
          "Severe stomach pain with vomiting.",
        ],
        infant: [
          "Very sleepy or hard to wake.",
          "Severe weakness or collapse.",
          "Vomit that is green, bloody, or black.",
        ],
        toddler: [
          "Very sleepy or hard to wake.",
          "Severe weakness or collapse.",
          "Vomit that is green, bloody, or black.",
        ],
        preschool: [
          "Very sleepy or hard to wake.",
          "Severe weakness or collapse.",
          "Vomit that is green, bloody, or black.",
        ],
      },
    },
  },
  "runny-nose": {
    title: "Runny nose",
    shortDescription:
      "Educational, non-diagnostic guidance focused on safe monitoring.",
    alerts: {
      default: [],
      infant: [
        "In infants, monitor feeding and breathing when the nose is blocked.",
      ],
    },
    sections: {
      observe: {
        default: ["Duration and flow of nasal discharge."],
        infant: [
          "Duration and flow of nasal discharge.",
          "Feeding and breathing comfort.",
        ],
        toddler: [
          "Duration and flow of nasal discharge.",
          "Sleep quality and comfort.",
        ],
        preschool: [
          "Duration and flow of nasal discharge.",
          "Sleep quality and comfort.",
        ],
      },
      common: {
        default: [
          "Seasonal changes or dry air.",
          "Irritation from dust, smoke, or strong smells.",
        ],
        infant: [
          "Seasonal changes or dry air.",
          "Irritation from dust, smoke, or strong smells.",
        ],
        toddler: [
          "Seasonal changes or dry air.",
          "Irritation from dust, smoke, or strong smells.",
        ],
        preschool: [
          "Seasonal changes or dry air.",
          "Irritation from dust, smoke, or strong smells.",
        ],
      },
      monitor: {
        default: [
          "Track how long the runny nose lasts.",
          "Note any changes in sleep or appetite.",
          "Observe comfort during the day.",
        ],
        infant: [
          "Track how long the runny nose lasts.",
          "Note changes in feeding or sleep.",
          "Observe breathing comfort.",
        ],
        toddler: [
          "Track how long the runny nose lasts.",
          "Note changes in sleep or appetite.",
          "Observe comfort during the day.",
        ],
        preschool: [
          "Track how long the runny nose lasts.",
          "Note changes in sleep or appetite.",
          "Observe comfort during the day.",
        ],
      },
      warning: {
        default: [
          "Runny nose that persists or worsens.",
          "Runny nose with fever or low energy.",
          "Runny nose with significant discomfort.",
        ],
        infant: [
          "Runny nose with fever or reduced feeding.",
          "Runny nose with noticeable breathing effort.",
          "Runny nose that persists or worsens.",
        ],
        toddler: [
          "Runny nose with fever or low energy.",
          "Runny nose with noticeable breathing effort.",
          "Runny nose that persists or worsens.",
        ],
        preschool: [
          "Runny nose with fever or low energy.",
          "Runny nose with noticeable breathing effort.",
          "Runny nose that persists or worsens.",
        ],
      },
      emergency: {
        default: [
          "Difficulty breathing or struggling to breathe.",
          "Bluish lips or skin.",
          "Unresponsive or very hard to wake.",
        ],
        infant: [
          "Difficulty breathing or struggling to breathe.",
          "Bluish lips or skin.",
          "Unresponsive or very hard to wake.",
        ],
        toddler: [
          "Difficulty breathing or struggling to breathe.",
          "Bluish lips or skin.",
          "Unresponsive or very hard to wake.",
        ],
        preschool: [
          "Difficulty breathing or struggling to breathe.",
          "Bluish lips or skin.",
          "Unresponsive or very hard to wake.",
        ],
      },
    },
  },
};
