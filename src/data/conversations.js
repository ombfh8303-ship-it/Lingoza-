export const conversationLibrary = {
  en: [
    {
      id: "cafe", titleAr: "في المقهى", titleEn: "At the café",
      descriptionAr: "اطلب مشروبك وتحدث مع النادل", descriptionEn: "Order a drink and talk to the server",
      icon: "coffee",
      steps: [
        { prompt: "Hello! What would you like to drink?", meaningAr: "مرحباً! ماذا تريد أن تشرب؟", meaningEn: "Hello! What would you like to drink?",
          choices: [
            { text: "I'd like a coffee, please.", meaningAr: "أود قهوة من فضلك.", meaningEn: "I'd like a coffee, please.", correct: true },
            { text: "I am from Jordan.", meaningAr: "أنا من الأردن.", meaningEn: "I am from Jordan.", correct: false },
            { text: "Where is the airport?", meaningAr: "أين المطار؟", meaningEn: "Where is the airport?", correct: false }
          ] },
        { prompt: "Would you like it hot or iced?", meaningAr: "هل تريده ساخناً أم مثلجاً؟", meaningEn: "Would you like it hot or iced?",
          choices: [
            { text: "My name is Adam.", meaningAr: "اسمي آدم.", meaningEn: "My name is Adam.", correct: false },
            { text: "Iced, please.", meaningAr: "مثلجاً من فضلك.", meaningEn: "Iced, please.", correct: true },
            { text: "It's next to the bank.", meaningAr: "إنه بجانب البنك.", meaningEn: "It's next to the bank.", correct: false }
          ] },
        { prompt: "Anything else?", meaningAr: "هل تريد شيئاً آخر؟", meaningEn: "Anything else?",
          choices: [
            { text: "No, that's all. Thank you.", meaningAr: "لا، هذا كل شيء. شكراً لك.", meaningEn: "No, that's all. Thank you.", correct: true },
            { text: "I work in a school.", meaningAr: "أعمل في مدرسة.", meaningEn: "I work in a school.", correct: false },
            { text: "Turn left at the street.", meaningAr: "انعطف يساراً عند الشارع.", meaningEn: "Turn left at the street.", correct: false }
          ] }
      ]
    },
    {
      id: "shopping", titleAr: "في المتجر", titleEn: "At the shop",
      descriptionAr: "اسأل عن السعر والمقاس وادفع", descriptionEn: "Ask about the price, size and payment",
      icon: "shopping",
      steps: [
        { prompt: "Can I help you?", meaningAr: "هل يمكنني مساعدتك؟", meaningEn: "Can I help you?",
          choices: [
            { text: "Yes, I'm looking for a T-shirt.", meaningAr: "نعم، أبحث عن قميص.", meaningEn: "Yes, I'm looking for a T-shirt.", correct: true },
            { text: "I'd like a table for two.", meaningAr: "أريد طاولة لشخصين.", meaningEn: "I'd like a table for two.", correct: false },
            { text: "The weather is sunny.", meaningAr: "الطقس مشمس.", meaningEn: "The weather is sunny.", correct: false }
          ] },
        { prompt: "What size do you need?", meaningAr: "ما المقاس الذي تحتاجه؟", meaningEn: "What size do you need?",
          choices: [
            { text: "At seven o'clock.", meaningAr: "في الساعة السابعة.", meaningEn: "At seven o'clock.", correct: false },
            { text: "Medium, please.", meaningAr: "متوسط من فضلك.", meaningEn: "Medium, please.", correct: true },
            { text: "Two tickets, please.", meaningAr: "تذكرتان من فضلك.", meaningEn: "Two tickets, please.", correct: false }
          ] },
        { prompt: "It's 12 dollars. How would you like to pay?", meaningAr: "السعر 12 دولاراً. كيف تود الدفع؟", meaningEn: "It's 12 dollars. How would you like to pay?",
          choices: [
            { text: "By card, please.", meaningAr: "بالبطاقة من فضلك.", meaningEn: "By card, please.", correct: true },
            { text: "I'm feeling hungry.", meaningAr: "أشعر بالجوع.", meaningEn: "I'm feeling hungry.", correct: false },
            { text: "Where is my hotel?", meaningAr: "أين فندقي؟", meaningEn: "Where is my hotel?", correct: false }
          ] }
      ]
    },
    {
      id: "airport", titleAr: "في المطار", titleEn: "At the airport",
      descriptionAr: "تحدث عند تسجيل الوصول وبوابة الصعود", descriptionEn: "Check in and find your departure gate",
      icon: "plane",
      steps: [
        { prompt: "Good morning. May I see your passport?", meaningAr: "صباح الخير. هل يمكنني رؤية جواز سفرك؟", meaningEn: "Good morning. May I see your passport?",
          choices: [
            { text: "Here you are.", meaningAr: "تفضل.", meaningEn: "Here you are.", correct: true },
            { text: "I'd like some water.", meaningAr: "أريد بعض الماء.", meaningEn: "I'd like some water.", correct: false },
            { text: "It's very expensive.", meaningAr: "إنه غالٍ جداً.", meaningEn: "It's very expensive.", correct: false }
          ] },
        { prompt: "Are you checking in any bags?", meaningAr: "هل ستسجل أي حقائب؟", meaningEn: "Are you checking in any bags?",
          choices: [
            { text: "Yes, one suitcase.", meaningAr: "نعم، حقيبة سفر واحدة.", meaningEn: "Yes, one suitcase.", correct: true },
            { text: "No, I don't like coffee.", meaningAr: "لا، لا أحب القهوة.", meaningEn: "No, I don't like coffee.", correct: false },
            { text: "At the next street.", meaningAr: "في الشارع التالي.", meaningEn: "At the next street.", correct: false }
          ] },
        { prompt: "Your gate is number 12. Have a nice flight!", meaningAr: "بوابتك رقم 12. رحلة سعيدة!", meaningEn: "Your gate is number 12. Have a nice flight!",
          choices: [
            { text: "Thank you. Have a nice day!", meaningAr: "شكراً لك. أتمنى لك يوماً سعيداً!", meaningEn: "Thank you. Have a nice day!", correct: true },
            { text: "I'd like a smaller size.", meaningAr: "أريد مقاساً أصغر.", meaningEn: "I'd like a smaller size.", correct: false },
            { text: "Can I see the menu?", meaningAr: "هل يمكنني رؤية قائمة الطعام؟", meaningEn: "Can I see the menu?", correct: false }
          ] }
      ]
    }
  ],
  fr: [
    {
      id: "cafe", titleAr: "في المقهى", titleEn: "Au café",
      descriptionAr: "اطلب مشروبك وتحدث مع النادل", descriptionEn: "Commandez une boisson et parlez au serveur",
      icon: "coffee",
      steps: [
        { prompt: "Bonjour ! Que désirez-vous boire ?", meaningAr: "مرحباً! ماذا تريد أن تشرب؟", meaningEn: "Hello! What would you like to drink?",
          choices: [
            { text: "Je voudrais un café, s'il vous plaît.", meaningAr: "أود قهوة من فضلك.", meaningEn: "I'd like a coffee, please.", correct: true },
            { text: "Je viens de Jordanie.", meaningAr: "أنا من الأردن.", meaningEn: "I come from Jordan.", correct: false },
            { text: "Où est l'aéroport ?", meaningAr: "أين المطار؟", meaningEn: "Where is the airport?", correct: false }
          ] },
        { prompt: "Vous le voulez chaud ou froid ?", meaningAr: "هل تريده ساخناً أم بارداً؟", meaningEn: "Would you like it hot or cold?",
          choices: [
            { text: "Je m'appelle Adam.", meaningAr: "اسمي آدم.", meaningEn: "My name is Adam.", correct: false },
            { text: "Froid, s'il vous plaît.", meaningAr: "بارداً من فضلك.", meaningEn: "Cold, please.", correct: true },
            { text: "C'est près de la banque.", meaningAr: "إنه بالقرب من البنك.", meaningEn: "It's near the bank.", correct: false }
          ] },
        { prompt: "Autre chose ?", meaningAr: "هل تريد شيئاً آخر؟", meaningEn: "Anything else?",
          choices: [
            { text: "Non, c'est tout. Merci.", meaningAr: "لا، هذا كل شيء. شكراً.", meaningEn: "No, that's all. Thank you.", correct: true },
            { text: "Je travaille dans une école.", meaningAr: "أعمل في مدرسة.", meaningEn: "I work in a school.", correct: false },
            { text: "Tournez à gauche.", meaningAr: "انعطف يساراً.", meaningEn: "Turn left.", correct: false }
          ] }
      ]
    },
    {
      id: "shopping", titleAr: "في المتجر", titleEn: "Au magasin",
      descriptionAr: "اسأل عن السعر والمقاس وادفع", descriptionEn: "Demandez le prix, la taille et payez",
      icon: "shopping",
      steps: [
        { prompt: "Je peux vous aider ?", meaningAr: "هل يمكنني مساعدتك؟", meaningEn: "Can I help you?",
          choices: [
            { text: "Oui, je cherche un T-shirt.", meaningAr: "نعم، أبحث عن قميص.", meaningEn: "Yes, I'm looking for a T-shirt.", correct: true },
            { text: "Une table pour deux.", meaningAr: "طاولة لشخصين.", meaningEn: "A table for two.", correct: false },
            { text: "Il fait beau.", meaningAr: "الطقس جميل.", meaningEn: "The weather is nice.", correct: false }
          ] },
        { prompt: "Quelle taille vous faut-il ?", meaningAr: "ما المقاس الذي تحتاجه؟", meaningEn: "What size do you need?",
          choices: [
            { text: "À sept heures.", meaningAr: "في الساعة السابعة.", meaningEn: "At seven o'clock.", correct: false },
            { text: "Taille moyenne, s'il vous plaît.", meaningAr: "مقاس متوسط من فضلك.", meaningEn: "Medium size, please.", correct: true },
            { text: "Deux billets, s'il vous plaît.", meaningAr: "تذكرتان من فضلك.", meaningEn: "Two tickets, please.", correct: false }
          ] },
        { prompt: "Cela coûte 12 euros. Comment voulez-vous payer ?", meaningAr: "السعر 12 يورو. كيف تود الدفع؟", meaningEn: "It costs 12 euros. How would you like to pay?",
          choices: [
            { text: "Par carte, s'il vous plaît.", meaningAr: "بالبطاقة من فضلك.", meaningEn: "By card, please.", correct: true },
            { text: "J'ai faim.", meaningAr: "أنا جائع.", meaningEn: "I'm hungry.", correct: false },
            { text: "Où est mon hôtel ?", meaningAr: "أين فندقي؟", meaningEn: "Where is my hotel?", correct: false }
          ] }
      ]
    },
    {
      id: "airport", titleAr: "في المطار", titleEn: "À l'aéroport",
      descriptionAr: "تحدث عند تسجيل الوصول وبوابة الصعود", descriptionEn: "Enregistrez-vous et trouvez votre porte",
      icon: "plane",
      steps: [
        { prompt: "Bonjour. Puis-je voir votre passeport ?", meaningAr: "صباح الخير. هل يمكنني رؤية جواز سفرك؟", meaningEn: "Hello. May I see your passport?",
          choices: [
            { text: "Le voici.", meaningAr: "تفضل.", meaningEn: "Here it is.", correct: true },
            { text: "Je voudrais de l'eau.", meaningAr: "أريد بعض الماء.", meaningEn: "I'd like some water.", correct: false },
            { text: "C'est très cher.", meaningAr: "إنه غالٍ جداً.", meaningEn: "It's very expensive.", correct: false }
          ] },
        { prompt: "Avez-vous des bagages à enregistrer ?", meaningAr: "هل لديك حقائب تريد تسجيلها؟", meaningEn: "Do you have any bags to check in?",
          choices: [
            { text: "Oui, une valise.", meaningAr: "نعم، حقيبة سفر واحدة.", meaningEn: "Yes, one suitcase.", correct: true },
            { text: "Non, je n'aime pas le café.", meaningAr: "لا، لا أحب القهوة.", meaningEn: "No, I don't like coffee.", correct: false },
            { text: "Dans la rue suivante.", meaningAr: "في الشارع التالي.", meaningEn: "On the next street.", correct: false }
          ] },
        { prompt: "Votre porte est la numéro 12. Bon voyage !", meaningAr: "بوابتك رقم 12. رحلة سعيدة!", meaningEn: "Your gate is number 12. Have a nice flight!",
          choices: [
            { text: "Merci. Bonne journée !", meaningAr: "شكراً. يوماً سعيداً!", meaningEn: "Thank you. Have a nice day!", correct: true },
            { text: "Je voudrais une taille plus petite.", meaningAr: "أريد مقاساً أصغر.", meaningEn: "I'd like a smaller size.", correct: false },
            { text: "Puis-je voir le menu ?", meaningAr: "هل يمكنني رؤية القائمة؟", meaningEn: "Can I see the menu?", correct: false }
          ] }
      ]
    }
  ]
};
