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
      },
      {
        id: "lesson-essential-questions",
        title: "Perguntas e informações básicas",
        objective: "Fazer perguntas simples para obter informações pessoais e cotidianas.",
        order: 4,
        phraseIds: [
          "questions-can-i-ask-question",
          "greetings-where-do-you-live",
          "greetings-what-do-you-do",
          "questions-is-that-right",
          "questions-what-are-you-doing",
          "questions-what-do-you-think",
          "questions-can-you-show-me",
          "questions-can-you-give-example"
        ],
        dialogueIds: []
      },
      {
        id: "lesson-daily-routine-simple-talk",
        title: "Rotina e conversas simples",
        objective: "Falar sobre ações do dia a dia, reagir em conversas curtas e encerrar uma interação.",
        order: 5,
        phraseIds: [
          "routine-i-wake-up-early",
          "routine-i-go-to-work",
          "questions-what-are-you-doing",
          "casual-really",
          "casual-thats-right",
          "casual-thats-fine",
          "routine-i-need-to-go-now",
          "greetings-see-you-later",
          "casual-see-you-tomorrow"
        ],
        dialogueIds: []
      },
      {
        id: "lesson-restaurant",
        title: "Restaurante",
        objective: "Pedir o cardápio, escolher uma refeição, informar restrições e realizar o pagamento.",
        order: 6,
        phraseIds: [
          "restaurant-can-we-have-menu",
          "restaurant-what-do-you-recommend",
          "restaurant-like-to-order",
          "restaurant-ill-have-chicken",
          "restaurant-have-seafood",
          "restaurant-allergic-seafood",
          "restaurant-food-delicious",
          "restaurant-bill-please",
          "restaurant-split-bill",
          "restaurant-pay-by-card"
        ],
        dialogueIds: [
          "ordering-food",
          "restaurant-ordering-meal"
        ]
      },
      {
        id: "lesson-basic-directions",
        title: "Direções básicas",
        objective: "Perguntar caminhos, entender distância e reconhecer instruções simples de direção.",
        order: 7,
        phraseIds: [
          "directions-where-is-the-bathroom",
          "directions-how-do-i-get-there",
          "directions-is-it-close",
          "directions-is-it-far-from-here",
          "directions-go-straight",
          "directions-turn-left",
          "directions-turn-right"
        ],
        dialogueIds: [
          "asking-directions"
        ]
      },
      {
        id: "lesson-airport-transport",
        title: "Aeroporto e transporte",
        objective: "Confirmar informações de voo e pedir transporte em situações de deslocamento.",
        order: 8,
        phraseIds: [
          "directions-where-is-the-airport",
          "directions-get-to-airport",
          "travel-flight-leave-time",
          "travel-flight-arrive-time",
          "travel-how-long-flight",
          "directions-right-bus",
          "directions-get-a-taxi",
          "directions-take-me-address"
        ],
        dialogueIds: [
          "airport-flight-information"
        ]
      },
      {
        id: "lesson-hotel-room-problems-checkout",
        title: "Hotel: quarto, problemas e saída",
        objective: "Pedir um quarto, solicitar preferências, comunicar problemas e fazer check-out.",
        order: 9,
        phraseIds: [
          "hotel-id-like-a-room",
          "hotel-any-vacancies",
          "hotel-room-two-nights",
          "hotel-non-smoking-room",
          "hotel-air-conditioning-not-working",
          "hotel-send-someone-room",
          "hotel-leave-luggage-here",
          "hotel-check-out"
        ],
        dialogueIds: []
      }
    ]
  }
];
