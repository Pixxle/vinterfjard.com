---
title: "Getting Started with Next.js 15"
date: "2024-12-20"
tags: ["nextjs", "react", "development"]
---

# Getting Started with Next.js 15

Next.js 15 brings exciting new features that make building React applications even more powerful and developer-friendly.

## App Router Revolution

The App Router has become the standard way to build Next.js applications. Here's why it's so powerful:

- **File-based routing**: Simply create files in the `app/` directory
- **Layouts**: Shared UI components across multiple pages
- **Server Components**: Render components on the server by default
- **Streaming**: Progressive page rendering for better performance

## Key Features

### Server Components by Default
```jsx
// This runs on the server by default
export default function HomePage() {
  return <h1>Hello World</h1>;
}
```

### Client Components When Needed
```jsx
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Layouts for Shared UI
```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

## Performance Optimizations

Next.js 15 includes several performance improvements:

1. **Faster builds** with improved bundling
2. **Better tree shaking** for smaller bundle sizes
3. **Enhanced image optimization** with WebP support
4. **Automatic code splitting** at the route level

## Getting Started

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

The future of React development is here with Next.js 15!