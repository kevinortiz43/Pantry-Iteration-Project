import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//     root: "./src/client/",
//   plugins: [react()],
//     server: {
//     host: true,
//     // don't forget to add routes here!!
//     // proxy: {
//     //   "/": "http://localhost:3000",
//     //   "/inventory": "http://localhost:3000",
//     //  "/:name": "http://localhost:3000",
//     //  "/create": "http://localhost:3000",
//     //  "/health": "http://localhost:3000",
//     // },
//   }
// })
