const http = require('http'); // Gunakan http biasa
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// Jalankan server HTTP biasa (Tailscale yang akan ubah jadi HTTPS di luar)
http.createServer(app).listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`     SIJAHUB API IS RUNNING (DOCKER MODE)    `);
  console.log(`     INTERNAL PORT: ${PORT}                  `);
  console.log(`     PUBLIC URL: https://comneta4.tailc90b09.ts.net:8443 `);
  console.log(`=============================================`);
});