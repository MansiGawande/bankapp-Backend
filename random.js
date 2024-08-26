console.log(Math.floor(Math.random() * 1000000000000));
// withdrwal  jb vo esa krta hai to 2 account me changes hoha 1 withdrwal aur dusre account me deposite perform hoga aur dono account ka avail balance update hoga // trastaction k trasfer m d/w dono m bal update hoga

// Deposite: Deposit ek aisa operation hai jisme aap apne khud ke account me paisa jama karte hain.
//Paisa ek hi account me add (bal update) hota hai, jisme deposit perform kiya jata hai.

// withdrawal "withdrawal me paisa kisi aur account me nahi jata. sirf sender account ka balance update hota hai receiver ka nhi.
//Withdrawal: Sirf paisa ek account se nikalta hai, dusre account me nahi jata.

// branch
//Agar aapki banking application me koi branches nahi hai, to bhi aapke bank ke liye ek unique IFSC code assign kiya ja sakta hai.
//sirf ek hi bank hai aur koi branches nahi hai, to aap ek fixed IFSC code set kar sakti hain jo har user ke liye same hoga. I


const utcDate = new Date("2024-08-18T20:36:17.156Z");
const localDate = utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

console.log(localDate); // date fatch in indian time


// create bank table name, address, Ifsc code
// 3. Session Management:
// Some banks enforce session timeouts, meaning if a session remains idle for too long, the user is logged out automatically. This is an added security measure.

//Account Lock: Multiple failed attempts ke baad account temporarily lock karna ek common practice hai. Lekin usually, banks password reset ka option provide karte hain. lockout instead forgot password

//react ki web application hai jisme transaction ke time password enter krva skte hai  agar vo password correct hota hai to transaction hoga aur user ke email par mail jaiga . aur agar 3 bar me transaction ke time password wrong hota hai to application se logout hoga kya ye real world se match karti hai

// sign in
// sign in ke time password enter krva skte hai  agar vo password correct hota hai to sign in hoga aur user ke email par mail jaiga . aur agar 3 bar me transaction ke time password wrong hota hai to application se logout hoga kya ye real world se match karti hai

// Yes, the process you described for signing in aligns with common practices in real-world applications, especially regarding account security. Here's how it matches up:

// Password Verification During Sign-In: It’s standard for users to enter their password to authenticate during sign-in. If the password is correct, they gain access to the application.

// Email Notification: Sending an email notification after successful sign-in is a common security measure, especially to inform users about account activity.

// Yes, in real-world applications, after three unsuccessful login attempts, it’s more common to provide the user with a "Forgot Password" option instead of locking the account for a fixed period. This approach enhances user experience while still maintaining security.

// If you prefer to implement this in your application, you can:

// Reset the failed attempt count if the user successfully changes their password through the "Forgot Password" process.
// Send an email notification informing the user about the failed login attempts and the option to reset their password.
// Allow users to reset their password immediately instead of waiting for a specific lockout period.



// Node.js (Server-side):
// Best for: Setting up and managing the WebSocket server.
// Why: Node.js is designed to handle multiple simultaneous connections efficiently. It can manage the WebSocket server that sends real-time updates to clients.
// Tools: You can use libraries like socket.io to set up and manage WebSocket connections easily.
// React (Client-side):
// Best for: Integrating WebSocket data into your application's user interface.
// Why: React can use WebSocket libraries (like socket.io-client) to receive real-time updates and display them in your app’s UI.
// Tools: You’ll use React to update the UI in response to the data received from the WebSocket server.
// In Practice:
// Node.js will handle the backend logic, sending real-time updates to clients.
// React will handle the frontend, receiving those updates and showing them to users in real-time.
// So, use Node.js for setting up the WebSocket server and React for handling the WebSocket client-side integration.

















