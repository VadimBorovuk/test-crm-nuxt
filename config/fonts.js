export const fontsConfig = {
  families: [
    {
      name: 'Roboto', // Назва шрифту
      provider: 'google', // Використовуємо Google Fonts
      weights: [400, 700], // Ваги шрифту (наприклад, 400 — regular, 700 — bold)
      styles: ['italic', 'normal'], // Стилі (наприклад, italic, normal)
      subsets: ['latin', 'cyrillic'], // Підмножини (наприклад, latin, cyrillic)
    },
    {
      name: 'Open Sans',
      provider: 'google',
      weights: [300, 400, 600],
    },
    {
      name: 'Vina Sans',
      provider: 'google',
      weights: [300, 400, 600],
    },
    {
      name: 'Inter',
      provider: 'google',
      weights: [300, 400, 600, 700],
    }
  ]
}
