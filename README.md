# 🌌 Star Wars Explorer

A modern **React + Vite** application that lets users explore characters from the **Star Wars Universe** using data from the [SWAPI API](https://swapi.dev).  
Includes authentication, pagination, search, species-based color coding, and smooth UX with modals and skeleton loaders.

---

## 🚀 Features Implemented

✅ **Login System (Mock)**
- Simple username/password login (`StarWars / Wars@123`)
- Token and expiry simulation with silent token refresh  
- Data stored in `localStorage`

✅ **Character Listing**
- Fetches data from SWAPI `/people` endpoint  
- Displays characters with name, image, and species color-coded border  
- Uses `Picsum Photos` for dynamic placeholder images  

✅ **Search**
- Client-side search integrated with SWAPI search parameter  
- Debounced input (500ms) for smooth performance  

✅ **Pagination**
- Server-side pagination using SWAPI's built-in pagination (10 per page)

✅ **Character Details Modal**
- Click on any character to view complete info  
- Includes homeworld details (name, climate, terrain, population)  
- Date formatted nicely for readability  

✅ **Species Highlight**
- Species color-coded borders for visual differentiation  
- Cached species names to reduce network requests  

✅ **Logout**
- Clears user data and returns to login screen  

✅ **Responsive UI**
- Built with **Tailwind CSS**  
- Fully responsive across mobile, tablet, and desktop  

✅ **Performance & UX Enhancements**
- Lazy-loaded pages (`Home` and `Login`)  
- Skeleton loaders for better user experience  
- Debounce hook for search  
- Auto token refresh logic in background  

---

## ⚙️ How to Run the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omsharma1813111032/star-wars-app.git
   cd starwars-explorer

2. **Install Dependencies**
    ```bash
    npm install

3. **Start the development server**
    ```bash
    npm run dev

4. **Login Credentials**
    ```bash
    Username: StarWars
    Password: Wars@123

## 🧠 Design Choices & Trade-offs

### ⚙️ SWAPI Limitations
- The API doesn’t support advanced filtering (by **homeworld**, **film**, or **species**).  
- Hence, filters are not implemented in the UI, but could be supported **client-side** for small datasets (not scalable).  
- This is clearly mentioned in the README for transparency.

### 🧩 No Backend
- This project focuses purely on **frontend logic**.  
- Authentication and token refresh are **mocked using `localStorage`**.

### 🔄 Silent Token Refresh
- Implemented a **simulated silent token refresh** every 10 seconds.  
- Mimics real-world session renewal flow for better realism.

### 🧬 Species Data Caching
- Fetches all species once and **caches results** to optimize performance.  
- Reduces unnecessary API calls to SWAPI.

### 🖼️ Image Placeholder
- Since SWAPI doesn’t provide character images,  
  uses [`https://picsum.photos`](https://picsum.photos) to generate **consistent placeholder images** dynamically.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React + Vite |
| **Styling** | Tailwind CSS |
| **API** | [SWAPI (Star Wars API)](https://swapi.dev) |
| **Icons** | React Icons |
| **State Management** | React Hooks |
| **Utilities** | Custom Hooks (`useDebounce`, `useAutoRefresh`) |

---

## 📁 Project Structure

src/

├── api/

│ └── swapi.js

├── components/

│ ├── CharacterCard.jsx

│ ├── CharacterList.jsx

│ ├── CharacterModal.jsx

│ ├── CharacterSkeleton.jsx

│ ├── Pagination.jsx

│ ├── SearchBar.jsx

├── hooks/

│ ├── useCharacters.js

│ └── useDebounce.js

├── pages/

│ ├── Home.jsx

│ └── Login.jsx

├── utils/

│ ├── auth.js

│ ├── getSpeciesColor.js

│ └── formatDate.js

├── App.jsx

└── main.jsx




---

## 🌟 Possible Future Improvements

✅ Add persistent **favorites** (store in `localStorage`)  
✅ Add **species/gender filters** for current page (client-side only)  
✅ Integrate **real authentication** & API gateway  
✅ Add **unit testing** with Jest + React Testing Library  

---

## 👨‍💻 Author

**Om Sharma** — Full Stack Developer  
📍 India  
💼 MERN Stack | Node.js | React | TypeScript  
🔗 [LinkedIn Profile](https://linkedin.com/in/om-sharma108)