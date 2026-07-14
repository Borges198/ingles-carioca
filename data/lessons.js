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
        objective: "Explicar que ainda está aprendendo e pedir ajuda, repetição, fala mais lenta, esclarecimento, pronúncia, soletração ou registro escrito.",
        order: 2,
        phraseIds: [
          "communication-can-you-help-me",
          "communication-still-learning-english",
          "communication-i-dont-understand",
          "communication-say-that-again",
          "communication-speak-more-slowly",
          "communication-what-do-you-mean",
          "communication-what-does-this-mean",
          "communication-pronounce-that",
          "communication-how-do-you-spell-it",
          "communication-write-it-down"
        ],
        dialogueIds: [
          "asking-for-help",
          "asking-for-clarification-in-english"
        ]
      },
      {
        id: "lesson-essential-questions",
        title: "Perguntas e respostas simples",
        objective: "Fazer perguntas cotidianas simples e responder com certeza, dúvida ou falta de informação.",
        order: 3,
        phraseIds: [
          "questions-can-i-ask-question",
          "greetings-where-do-you-live",
          "greetings-what-do-you-do",
          "questions-what-do-you-think",
          "questions-is-that-right",
          "essentials-of-course",
          "casual-maybe",
          "essentials-im-not-sure",
          "essentials-i-dont-know"
        ],
        dialogueIds: []
      },
      {
        id: "lesson-daily-routine-simple-talk",
        title: "Reações e encerramento de conversas",
        objective: "Reagir a informações, confirmar ou aceitar algo, agradecer e encerrar uma conversa com naturalidade.",
        order: 4,
        phraseIds: [
          "casual-really",
          "essentials-excellent",
          "casual-thats-right",
          "casual-thats-fine",
          "essentials-thank-you-very-much",
          "essentials-no-problem",
          "routine-i-need-to-go-now",
          "greetings-see-you-later",
          "casual-see-you-tomorrow"
        ],
        dialogueIds: []
      },
      {
        id: "lesson-basic-directions",
        title: "Direções básicas",
        objective: "Perguntar caminhos, entender distância e reconhecer instruções simples de direção.",
        order: 5,
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
        objective: "Chegar ao aeroporto, confirmar informações básicas do voo e usar transporte terrestre antes ou depois da viagem.",
        order: 6,
        phraseIds: [
          "directions-where-is-the-airport",
          "directions-get-to-airport",
          "directions-right-bus",
          "travel-flight-leave-time",
          "travel-flight-arrive-time",
          "travel-how-long-flight",
          "directions-get-a-taxi",
          "directions-take-me-address"
        ],
        dialogueIds: [
          "airport-flight-information"
        ]
      },
      {
        id: "lesson-hotel-check-in",
        title: "Chegada e check-in no hotel",
        objective: "Chegar ao hotel e lidar com duas rotas: fazer check-in com reserva ou pedir um quarto sem reserva.",
        order: 7,
        phraseIds: [
          "greetings-good-evening",
          "hotel-check-in",
          "hotel-i-have-a-reservation",
          "greetings-my-name-is",
          "hotel-for-three-nights",
          "hotel-breakfast-included",
          "hotel-id-like-a-room",
          "hotel-any-vacancies",
          "hotel-room-two-nights",
          "hotel-non-smoking-room"
        ],
        dialogueIds: [
          "hotel-check-in",
          "hotel-check-in-expanded"
        ]
      },
      {
        id: "lesson-hotel-room-problems-checkout",
        title: "Durante a hospedagem e check-out",
        objective: "Pedir informações durante a hospedagem, comunicar problemas no quarto, solicitar assistência e finalizar a estadia.",
        order: 8,
        phraseIds: [
          "hotel-wifi-password",
          "hotel-air-conditioning-not-working",
          "hotel-send-someone-room",
          "hotel-checkout-time",
          "hotel-leave-luggage-here",
          "hotel-check-out"
        ],
        dialogueIds: []
      },
      {
        id: "lesson-restaurant",
        title: "Restaurante",
        objective: "Pedir o cardápio, verificar ingredientes e alergias, escolher a refeição, avaliar o atendimento e realizar o pagamento.",
        order: 9,
        phraseIds: [
          "restaurant-can-we-have-menu",
          "restaurant-what-do-you-recommend",
          "restaurant-have-seafood",
          "restaurant-allergic-seafood",
          "restaurant-like-to-order",
          "restaurant-ill-have-chicken",
          "restaurant-food-delicious",
          "restaurant-bill-please",
          "restaurant-split-bill",
          "restaurant-pay-by-card"
        ],
        dialogueIds: [
          "ordering-food",
          "restaurant-ordering-meal"
        ]
      }
    ]
  }
];
