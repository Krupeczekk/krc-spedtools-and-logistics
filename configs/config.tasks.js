const Tasks = [
    {
        categoryName: 'Formowanie ładunku',
        tasks: [
            {
                title: 'Oblicz ile paczek o wymiarach (200 x 200 x 200 [mm]) zmieści się na palecie EUR 1 w jednej warstwie',
                calcPlace: true,
                correctAnswer: 24
            },
            {
                title: 'Oblicz ile paczek o wymiarach (180 x 230 x 250 [mm]) zmieści się na palecie EUR 1, przy maksymalnej wysokości PJŁ wynoszącej 1500mm.',
                calcPlace: true,
                correctAnswers: {
                    'Ilość paczek w jednej warstwiee': 20,
                    'Ilość warstw paczek na PJŁ': 5,
                    'Ilość wszystkich paczek na PJŁ': 100
                }
            },
            {
                title: 'Ile paczek o wymiarach (150 x 200 x 250 [mm]) oraz wadze 3kg/sztuka zmieści się na palecie EUR 1, przy maksymalnej wysokości PJŁ 1450mm? Uwzględnij wagę palety.',
                calcPlace: true,
                correctAnswers: {
                    'Ilość paczek w jednej warstwie': 32,
                    'Ilość warstw': 5,
                    'Ilość wszystkich paczek na PJŁ': 160,
                    'Waga wszystkich paczek': 480,
                    'Waga całej PJŁ': 505
                }
            }
        ]
    },
    {
        categoryName: 'Czas pracy kierowcy',
        tasks: [
            {
                title: 'Kierowca porusza się prędkością 75km/h, ile kilometrów kierowca przejedzie w 3 godziny?',
                calcPlace: false,
                correctAnswer: 225
            },
            {
                title: 'Kierowca porusza się prędkością 81km/h, ile kilometrów kierowca przejedzie w 4.5 godziny?',
                calcPlace: false,
                correctAnswer: 364.5
            }
        ]
    }
]