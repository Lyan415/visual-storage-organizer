# Visual Storage Organizer (視覺化物品收納助手)

A mobile-first web application designed to help you organize your physical items using a visual, hierarchical approach. Treat your photos as folders and never lose track of your stuff again.

![App Screenshot](./public/vite.svg) 
*(Note: Replace this with actual screenshots of your app)*

## 🚀 Key Features (系統特色)

- **📸 Photo-First Interface**: 
  - Visual navigation using images instead of just text.
  - "Take Photo" simulation for adding new items.
- **📂 Deep Hierarchy (無限層級)**: 
  - Nest items as deep as you need: `Home` > `Living Room` > `TV Stand` > `Top Drawer` > `Batteries`.
- **🔍 Fast Search (快速搜尋)**: 
  - Instantly find items by name or notes.
  - Clickable search results that take you directly to the item.
- **📍 Smart Navigation (智慧路徑)**: 
  - Breadcrumb navigation showing exactly where an item is located.
  - Click any part of the path (e.g., `Root > Bedroom > Closet`) to jump there immediately.
- **📱 Mobile Optimized (行動優先)**: 
  - Designed for touch w/ large targets.
  - Bottom navigation bar for easy thumb access.
  - Clean, modern aesthetic powered by Tailwind CSS.

## 🛠 Tech Stack (技術棧)

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ Getting Started (如何開始)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/visual-storage-organizer.git
    cd visual-storage-organizer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` (or the port shown in your terminal).

## 📱 Use on Mobile (手機測試)

To test on your mobile device on the same network:
```bash
npm run dev -- --host
```
Then visit the Network IP address shown (e.g., `http://192.168.1.x:5173`).

## 🤝 Contributing

Feel free to open issues or submit pull requests if you have ideas for improvements!

## 📄 License

MIT
