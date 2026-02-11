# Visual Storage Organizer (視覺化物品收納助手)

A modern, mobile-first web application designed to help you organize your physical items using a visual, hierarchical approach. Treat your photos as folders and never lose track of your stuff again.

![App Screenshot](./public/vite.svg)
*(Note: Replace this with actual screenshots of your app)*

## 🚀 Key Features (系統特色)

- **📸 Photo-First Interface**:
  - Visual navigation using images instead of just text.
  - "Take Photo" integration for quick item entry.
  - **Full Image Support**: Uploads store directly to Supabase Storage, viewable across all devices.

- **🔐 Secure & Private (安全隱私)**:
  - user authentication powered by Supabase Auth.
  - **Data Isolation**: Multi-user support with strict Row-Level Security (RLS) ensuring you only see your own items.

- **📂 Deep Hierarchy (無限層級)**:
  - Nest items as deep as you need: `Home` > `Living Room` > `TV Stand` > `Top Drawer` > `Batteries`.
  - **Projects**: Create separate workspaces for different contexts (e.g., Home, Office, Garage).

- **📝 Edit & Update (隨時編輯)**:
  - Modify item names, notes, and photos on the fly.
  - Real-time updates across devices.

- **🔍 Fast Search (快速搜尋)**:
  - Instantly find items by name or notes.
  - Clickable search results that take you directly to the item.

- **📍 Smart Navigation (智慧路徑)**:
  - Breadcrumb navigation showing exactly where an item is located.
  - One-tap navigation to any parent folder.

- **📱 Mobile Optimized (行動優先)**:
  - Designed for touch w/ large targets.
  - Bottom navigation bar for easy thumb access.
  - Clean, modern aesthetic powered by Tailwind CSS.

## 🛠 Tech Stack (技術棧)

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ Getting Started (如何開始)

### Prerequisites

- Node.js (v18 or higher)
- A Supabase project

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/visual-storage-organizer.git
    cd visual-storage-organizer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open in Browser**
    Visit `http://localhost:5173`

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
