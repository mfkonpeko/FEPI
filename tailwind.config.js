/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        azul: "#0d213f",
        verde: "#009d71",
        principal: "#f8f9f5",
        principal_2: "#ede8de",
      },
    },
    screens: {
      // Otros breakpoints predeterminados
      sm: "640px",
      // Tu nuevo breakpoint personalizado
      custom: "1159px",
      lg: "1024px",
    },
  },
  plugins: [],
};
