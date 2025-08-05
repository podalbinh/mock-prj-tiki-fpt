# React Loading Context System

Hệ thống quản lý loading state đơn giản và linh hoạt sử dụng React Context API.

## 🚀 Tính năng

- ✅ Global loading state với Context API
- ✅ Loading overlay toàn màn hình 
- ✅ Manual control hoàn toàn
- ✅ TypeScript support đầy đủ
- ✅ Hook đơn giản và dễ sử dụng
- ✅ Không tích hợp với axios (tách biệt hoàn toàn)

## 📁 Cấu trúc file

```
src/
├── contexts/
│   ├── LoadingContext.ts         # Context definition
│   └── LoadingProvider.tsx       # Provider component
├── hooks/
│   └── useLoading.ts             # Hook để sử dụng loading context
├── config/
│   ├── apiClient.ts              # Axios instance configuration
│   └── api.ts                    # Generic HTTP methods & API response handling
├── components/
│   ├── common/
│   │   └── LoadingOverlay.tsx    # Loading overlay component
│   ├── wrapper/
│   │   └── GlobalLoadingWrapper.tsx # Wrapper cho toàn app
│   └── examples/
│       └── LoadingDemo.tsx       # Demo component
├── services/
│   └── apiService.ts             # Business-specific API functions (User API)
└── .env                          # Environment variables
```

## 🔧 Setup và Cài đặt

### 1. Wrap app với GlobalLoadingWrapper

```tsx
// App.tsx
import { GlobalLoadingWrapper } from '@/components/wrapper/GlobalLoadingWrapper';

function App() {
  return (
    <GlobalLoadingWrapper>
      {/* App content của bạn */}
    </GlobalLoadingWrapper>
  );
}
```

### 2. Import hook trong component

```tsx
import { useLoading } from '@/hooks/useLoading';
```

## 🏗️ Tạo Service mới với Request Class

### Cách tạo service cho Posts API:

```tsx
// services/postService.ts
import Request from '@/config/api';
import type { ApiResponse } from '@/config/api';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

interface CreatePostData {
  title: string;
  content: string;
}

export const postApi = {
  getPosts: () => Request.get<Post[]>('/posts'),
  getPostById: (id: string) => Request.get<Post>(`/posts/${id}`),
  createPost: (data: CreatePostData) => Request.post<Post>('/posts', data),
  updatePost: (id: string, data: Partial<Post>) => Request.put<Post>(`/posts/${id}`, data),
  deletePost: (id: string) => Request.delete<void>(`/posts/${id}`),
};

export type { Post, CreatePostData };
```

### Sử dụng Request Class trong component:

#### Method 1: Qua Service Layer (Recommended)
```tsx
import { useLoading } from '@/hooks/useLoading';
import { postApi } from '@/services/postService';

const PostComponent = () => {
  const { setLoading } = useLoading();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await postApi.getPosts(); // → Request.get<Post[]>('/posts')
      // Handle posts...
    } finally {
      setLoading(false);
    }
  };
};
```

#### Method 2: Request Class trực tiếp
```tsx
import { useLoading } from '@/hooks/useLoading';
import Request from '@/config/api';

const PostComponent = () => {
  const { setLoading } = useLoading();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await Request.get<Post[]>('/posts'); // Trực tiếp
      // Handle posts...
    } finally {
      setLoading(false);
    }
  };
};
```

## 📖 Cách sử dụng

### Method 1: setLoading(boolean)

```tsx
import { useLoading } from '@/hooks/useLoading';
import { userApi } from '@/services/apiService';

const MyComponent = () => {
  const { setLoading } = useLoading();

  const fetchData = async () => {
    try {
      setLoading(true);  // ✅ Hiển thị loading
      const data = await userApi.getUsers();
      // Process data...
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // ✅ Ẩn loading (luôn chạy)
    }
  };

  return <button onClick={fetchData}>Fetch Data</button>;
};
```

### Method 2: showLoading/hideLoading

```tsx
const MyComponent = () => {
  const { showLoading, hideLoading } = useLoading();

  const createUser = async () => {
    try {
      showLoading();     // ✅ Hiển thị loading
      await userApi.createUser(userData);
      // Success handling...
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();     // ✅ Ẩn loading
    }
  };

  return <button onClick={createUser}>Create User</button>;
};
```

### Method 3: API call không loading

```tsx
const fetchDataQuietly = async () => {
  try {
    // ✅ Gọi API im lặng, không hiển thị loading
    const data = await userApi.getUsers();
    setData(data);
  } catch (error) {
    console.error(error);
  }
};
```

## 📋 API Reference

### useLoading Hook

```tsx
const {
  isLoading,      // boolean: current loading state
  setLoading,     // (loading: boolean) => void
  showLoading,    // () => void: set loading = true
  hideLoading,    // () => void: set loading = false
} = useLoading();
```

### Methods

| Method | Type | Description |
|--------|------|-------------|
| `isLoading` | `boolean` | Current loading state |
| `setLoading(loading)` | `(boolean) => void` | Set loading state directly |
| `showLoading()` | `() => void` | Show loading overlay |
| `hideLoading()` | `() => void` | Hide loading overlay |

## 🎨 Customization

### Custom Loading Message

```tsx
// Trong LoadingOverlay component
<LoadingOverlay isVisible={isLoading} message="Custom loading message..." />
```

### Custom Loading Spinner

```tsx
// Chỉnh sửa LoadingOverlay.tsx
const LoadingOverlay = ({ isVisible, message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Custom spinner */}
      <div className="your-custom-spinner"></div>
      <p>{message}</p>
    </div>
  );
};
```

## 💡 Best Practices

### 1. Luôn sử dụng try-catch-finally

```tsx
const apiCall = async () => {
  try {
    setLoading(true);
    const result = await api.getData();
    return result;
  } catch (error) {
    console.error(error);
    // Handle error
  } finally {
    setLoading(false); // ✅ Luôn cleanup loading
  }
};
```

### 2. Sử dụng async/await pattern

```tsx
// ✅ Good
const handleSubmit = async () => {
  try {
    showLoading();
    await submitForm();
    await refreshData();
  } finally {
    hideLoading();
  }
};

// ❌ Avoid
const handleSubmit = () => {
  showLoading();
  submitForm().then(() => {
    hideLoading(); // Có thể bị skip nếu có lỗi
  });
};
```

### 3. Conditional loading cho background tasks

```tsx
// ✅ User action - hiển thị loading
const handleUserAction = async () => {
  try {
    setLoading(true);
    await api.updateProfile();
  } finally {
    setLoading(false);
  }
};

// ✅ Background sync - không hiển thị loading
const backgroundSync = async () => {
  await api.syncData(); // Chạy im lặng
};
```

## 🐛 Error Handling Patterns

### Pattern 1: Simple error handling

```tsx
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await api.getData();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Pattern 2: Multiple API calls

```tsx
const fetchAllData = async () => {
  try {
    setLoading(true);
    
    const [users, posts, comments] = await Promise.all([
      api.getUsers(),
      api.getPosts(), 
      api.getComments()
    ]);
    
    setUsers(users);
    setPosts(posts);
    setComments(comments);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Pattern 3: Sequential API calls

```tsx
const createUserAndFetch = async () => {
  try {
    setLoading(true);
    
    // Step 1: Create user
    await api.createUser(userData);
    
    // Step 2: Fetch updated list
    const users = await api.getUsers();
    setUsers(users);
    
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 🚀 Demo & Testing

### Chạy development server:

```bash
npm run dev
```

### Test các scenario:

1. **Normal API calls** - Test với loading overlay
2. **Error handling** - Test khi API fail
3. **Multiple calls** - Test loading state với nhiều API calls
4. **Background operations** - Test API calls không loading

## 📦 Dependencies

- **react** - Core framework
- **axios** - HTTP client (simple instance)
- **tailwindcss** - Styling
- **typescript** - Type safety

## 🔄 Migration từ hệ thống cũ

Nếu bạn có hệ thống loading cũ:

```tsx
// Before: Axios interceptors
axios.get('/api/users', { loading: true });

// After: Manual control
const { setLoading } = useLoading();
try {
  setLoading(true);
  await api.getUsers();
} finally {
  setLoading(false);
}
```

## 📝 Notes

- Loading state là global - sẽ ảnh hưởng toàn app
- Chỉ có 1 loading overlay tại 1 thời điểm
- Loading state không persist qua page refresh
- Component unmount sẽ không ảnh hưởng loading state (cần manual cleanup nếu cần)
