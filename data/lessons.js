export const courseLevels = [
  {
    id: "level-initial",
    title: "Nível inicial",
    description: "Primeiro percurso para cumprimentos, comunicação essencial e chegada ao hotel.",
    order: 1,
    lessons: [
      {
        id: "lesson-first-contact",
        title: "Primeiro contato",
        objective: "Cumprimentar, apresentar-se e iniciar uma conversa simples.",
        order: 1,
        phraseIds: [
          "greetings-whats-your-name",
          "greetings-my-name-is",
          "greetings-nice-to-meet-you",
          "greetings-how-are-you",
          "greetings-im-good-and-you",
          "greetings-where-are-you-from"
        ],
        dialogueIds: [
          "meeting-someone",
          "meeting-someone-basic-questions"
        ]
      },
      {
        id: "lesson-when-i-dont-understand",
        title: "Quando não entendo",
        objective: "Pedir ajuda, repetição, explicação, soletração e redução da velocidade da fala.",
        order: 2,
        phraseIds: [
          "communication-can-you-help-me",
          "communication-i-dont-understand",
          "communication-say-that-again",
          "communication-speak-more-slowly",
          "communication-what-does-this-mean",
          "communication-how-do-you-spell-it",
          "communication-write-it-down",
          "communication-speak-little-english"
        ],
        dialogueIds: [
          "asking-for-help",
          "asking-for-clarification-in-english"
        ]
      },
      {
        id: "lesson-hotel-check-in",
        title: "Check-in no hotel",
        objective: "Chegar ao hotel, informar uma reserva e pedir informações iniciais da hospedagem.",
        order: 3,
        phraseIds: [
          "greetings-good-evening",
          "hotel-i-have-a-reservation",
          "greetings-my-name-is",
          "hotel-for-three-nights",
          "hotel-check-in",
          "hotel-checkout-time",
          "hotel-breakfast-included",
          "hotel-wifi-password"
        ],
        dialogueIds: [
          "hotel-check-in",
          "hotel-check-in-expanded"
        ]
      }
    ]
  }
];
