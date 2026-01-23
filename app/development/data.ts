export type DevelopmentCategoryKey =
  | "motora"
  | "cognitiva"
  | "linguagem"
  | "socioemocional";

export type DevelopmentStage = {
  id: string;
  label: string;
  minMonths: number;
  maxMonths: number;
  categories: Record<DevelopmentCategoryKey, string[]>;
  attentionSigns: string[];
  stimulation: string[];
};

export const developmentStages: DevelopmentStage[] = [
  {
    id: "0-3m",
    label: "0-3 meses",
    minMonths: 0,
    maxMonths: 3,
    categories: {
      motora: [
        "Sustenta a cabeca por alguns segundos ao ficar de barriga para baixo.",
        "Movimentos de bracos e pernas ficam mais coordenados.",
        "Abre as maos com mais frequencia e leva as maos a boca.",
      ],
      cognitiva: [
        "Segue rostos e objetos proximos com o olhar.",
        "Reage a sons fortes e a voz do cuidador.",
        "Mostra interesse por luzes e contrastes.",
      ],
      linguagem: [
        "Emite sons suaves e pequenos balbucios.",
        "Choro comeca a variar para diferentes necessidades.",
        "Acalma ao ouvir vozes familiares.",
      ],
      socioemocional: [
        "Sorri em resposta a rostos conhecidos.",
        "Mantem contato visual por alguns segundos.",
        "Demonstra conforto ao ser segurado.",
      ],
    },
    attentionSigns: [
      "Pouco ou nenhum contato visual.",
      "Dificuldade persistente para mamar ou sugar.",
      "Rigidez corporal muito intensa ou corpo muito flacido.",
      "Nao reage a sons altos.",
    ],
    stimulation: [
      "Tempo de barriga para baixo curto e supervisionado.",
      "Falar olhando nos olhos e narrar o que esta fazendo.",
      "Brinquedos com contraste preto e branco.",
      "Rotinas simples e previsiveis.",
    ],
  },
  {
    id: "4-6m",
    label: "4-6 meses",
    minMonths: 4,
    maxMonths: 6,
    categories: {
      motora: [
        "Rola de barriga para costas ou vice-versa.",
        "Senta com apoio e sustenta melhor a cabeca.",
        "Alcanca e segura objetos com mais precisao.",
      ],
      cognitiva: [
        "Explora objetos com as maos e boca.",
        "Mostra expectativa em rotinas do dia a dia.",
        "Procura a origem de sons.",
      ],
      linguagem: [
        "Balbucios mais variados.",
        "Imita sons simples e brincadeiras de voz.",
        "Responde com sons quando alguem fala.",
      ],
      socioemocional: [
        "Da risadas e demonstra prazer com interacoes.",
        "Reconhece cuidadores e pode estranhar desconhecidos.",
        "Gosta de brincadeiras de troca, como sorrir e vocalizar.",
      ],
    },
    attentionSigns: [
      "Nao sustenta a cabeca com firmeza.",
      "Pouca interacao ou resposta a vozes.",
      "Nao tenta pegar objetos proximos.",
      "Pouco sorriso social.",
    ],
    stimulation: [
      "Brincadeiras de virar e alcancar objetos.",
      "Conversar, cantar e repetir sons.",
      "Objetos seguros com texturas diferentes.",
      "Rotinas previsiveis antes do sono.",
    ],
  },
  {
    id: "7-12m",
    label: "7-12 meses",
    minMonths: 7,
    maxMonths: 12,
    categories: {
      motora: [
        "Senta sem apoio por mais tempo.",
        "Engatinha ou se desloca de outras formas.",
        "Fica em pe com apoio e pode dar passos com ajuda.",
      ],
      cognitiva: [
        "Procura objetos parcialmente escondidos.",
        "Imita gestos simples, como dar tchau.",
        "Explora causa e efeito, como sacudir ou bater.",
      ],
      linguagem: [
        "Balbucio com silabas repetidas.",
        "Responde ao proprio nome.",
        "Entende palavras simples em contexto.",
      ],
      socioemocional: [
        "Mostra preferencia por pessoas familiares.",
        "Brinca de esconder e aparecer.",
        "Expressa emocao com mais clareza.",
      ],
    },
    attentionSigns: [
      "Nao senta sem apoio.",
      "Nao balbucia ou nao reage ao nome.",
      "Pouca curiosidade por objetos.",
      "Pouca interacao com cuidadores.",
    ],
    stimulation: [
      "Brincar de esconde-esconde de forma leve.",
      "Oferecer objetos seguros para explorar.",
      "Nomear objetos e acoes do dia a dia.",
      "Criar espaco seguro para se movimentar.",
    ],
  },
  {
    id: "1-2y",
    label: "1-2 anos",
    minMonths: 13,
    maxMonths: 35,
    categories: {
      motora: [
        "Anda com mais confianca e comeca a correr.",
        "Sobe degraus com ajuda.",
        "Chuta ou lanca bola com o corpo.",
      ],
      cognitiva: [
        "Segue comandos simples de um passo.",
        "Aponta para pedir ou mostrar interesse.",
        "Experimenta encaixar e empilhar objetos.",
      ],
      linguagem: [
        "Usa palavras simples para pedir.",
        "Aumenta o vocabulario gradualmente.",
        "Pode juntar duas palavras perto dos 2 anos.",
      ],
      socioemocional: [
        "Imita acoes do adulto.",
        "Mostra preferencias por brincadeiras especificas.",
        "Brinca ao lado de outras criancas (brincadeira paralela).",
      ],
    },
    attentionSigns: [
      "Nao anda de forma independente apos 18 meses.",
      "Nao aponta para mostrar interesse.",
      "Pouca tentativa de comunicacao.",
      "Nao demonstra interesse em interacoes.",
    ],
    stimulation: [
      "Brincar de faz de conta simples com objetos do dia a dia.",
      "Ler livros curtos e repetir palavras.",
      "Dar escolhas simples com duas opcoes.",
      "Manter rotinas de sono e alimentacao.",
    ],
  },
  {
    id: "3-5y",
    label: "3-5 anos",
    minMonths: 36,
    maxMonths: 71,
    categories: {
      motora: [
        "Corre, pula e sobe com mais coordenacao.",
        "Usa talheres e comeca a se vestir com pouca ajuda.",
        "Segura lapis e faz tracos e formas simples.",
      ],
      cognitiva: [
        "Conta historias simples com inicio e fim.",
        "Reconhece cores, formas e padroes.",
        "Resolve pequenos problemas, como quebra-cabecas.",
      ],
      linguagem: [
        "Forma frases completas e faz perguntas.",
        "Conta o que aconteceu no dia a dia.",
        "Entende instrucoes com 2 ou 3 etapas.",
      ],
      socioemocional: [
        "Brinca de forma cooperativa com outras criancas.",
        "Entende regras simples e turnos.",
        "Expressa emocoes com palavras.",
      ],
    },
    attentionSigns: [
      "Fala muito pouco ou dificil de entender para pessoas proximas.",
      "Dificuldade persistente para brincar com outras criancas.",
      "Perda de habilidades que ja tinha.",
      "Reacoes emocionais muito intensas e frequentes.",
    ],
    stimulation: [
      "Jogos de regras simples e turnos.",
      "Atividades de desenho e recorte com supervisao.",
      "Conversas sobre sentimentos e rotinas.",
      "Brincadeiras ao ar livre com movimento.",
    ],
  },
];
