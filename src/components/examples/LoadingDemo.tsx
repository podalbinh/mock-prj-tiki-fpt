import React, { useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import { userApi } from "@/services/apiService";
import { postApi } from "@/services/postService";
import Request from "@/config/api"; // Import Request class trực tiếp
import type { User } from "@/services/apiService";
import type { Post } from "@/services/postService";

const LoadingDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();

  // Demo 1: Sử dụng setLoading(true/false) với userApi
  const fetchUsersWithSetLoading = async () => {
    try {
      setError("");
      showLoading(); // Hiển thị loading overlay

      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      hideLoading(); // Ẩn loading overlay
    }
  };

  // Demo 2: Sử dụng Request class trực tiếp
  const fetchDataWithRequestClass = async () => {
    try {
      setError("");
      showLoading();

      // Sử dụng Request class trực tiếp thay vì qua service
      const userResponse = await Request.get<User[]>("/users");
      const postResponse = await Request.get<Post[]>("/posts");

      setUsers(userResponse.data);
      setPosts(postResponse.data);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      hideLoading();
    }
  };

  // Demo 3: Sử dụng postApi service
  const fetchPostsWithService = async () => {
    try {
      setError("");
      showLoading();

      const response = await postApi.getAllPosts();
      setPosts(response.data);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      hideLoading();
    }
  };

  // Demo 2: Sử dụng showLoading/hideLoading
  const fetchUsersWithShowHide = async () => {
    try {
      setError("");
      showLoading(); // Hiển thị loading overlay

      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      hideLoading(); // Ẩn loading overlay
    }
  };

  // Demo 3: API call không có loading
  const fetchUsersQuiet = async () => {
    try {
      setError("");
      // Không hiển thị loading - gọi API im lặng

      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    }
  };

  // Demo 4: Simulate API call với delay
  const simulateApiCall = async () => {
    try {
      setError("");
      showLoading("LOADING 2s NE");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data
      const mockUsers: User[] = [
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
        { id: "3", name: "Bob Johnson", email: "bob@example.com" },
      ];

      setUsers(mockUsers);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      hideLoading();
    }
  };

  // Demo 5: Create user với loading
  const createUser = async () => {
    try {
      setError("");
      showLoading();

      const newUserData = {
        name: "New User",
        email: "newuser@example.com",
      };

      await userApi.createUser(newUserData);

      // Refresh user list
      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Loading Context Demo
      </h2>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button
          onClick={fetchUsersWithSetLoading}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          User API (setLoading)
        </button>

        <button
          onClick={fetchDataWithRequestClass}
          className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Request.get() trực tiếp
        </button>

        <button
          onClick={fetchPostsWithService}
          className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Post API Service
        </button>

        <button
          onClick={fetchUsersWithShowHide}
          className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          showLoading/hideLoading
        </button>

        <button
          onClick={fetchUsersQuiet}
          className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          API call không loading
        </button>

        <button
          onClick={simulateApiCall}
          className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          Simulate API (2s delay)
        </button>

        <button
          onClick={createUser}
          className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Create User
        </button>

        <button
          onClick={() => {
            setUsers([]);
            setPosts([]);
          }}
          className="px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          Clear All Data
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-center">
            <div className="mr-2">❌</div>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {/* Users Display */}
      {users.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Users Data ({users.length} users)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="font-semibold text-gray-800">{user.name}</div>
                <div className="text-gray-600 text-sm">{user.email}</div>
                <div className="text-gray-400 text-xs">ID: {user.id}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts Display */}
      {posts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Posts Data ({posts.length} posts)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <div className="font-semibold text-gray-800 mb-2">
                  {post.title}
                </div>
                <div className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {post.content}
                </div>
                <div className="text-gray-400 text-xs">
                  <div>ID: {post.id}</div>
                  <div>Author: {post.authorId}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-3">
          🚀 Cách sử dụng Request Class:
        </h4>
        <div className="space-y-3 text-sm text-blue-700">
          <div className="bg-white p-3 rounded border">
            <div className="font-semibold mb-1">
              1. Qua Service Layer (Recommended):
            </div>
            <code className="text-xs bg-gray-100 p-1 rounded">
              userApi.getUsers() // → Request.get&lt;User[]&gt;('/users')
            </code>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-semibold mb-1">
              2. Trực tiếp Request Class:
            </div>
            <code className="text-xs bg-gray-100 p-1 rounded">
              Request.get&lt;User[]&gt;('/users')
            </code>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-semibold mb-1">3. Loading Control:</div>
            <div className="space-y-1">
              <div>
                <code className="text-xs bg-gray-100 p-1 rounded">
                  setLoading(true)
                </code>{" "}
                → Hiển thị loading
              </div>
              <div>
                <code className="text-xs bg-gray-100 p-1 rounded">
                  setLoading(false)
                </code>{" "}
                → Ẩn loading
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-100 rounded text-blue-800 text-sm">
          <strong>💡 Best Practice:</strong> Luôn sử dụng try-catch-finally để
          đảm bảo loading được ẩn đi ngay cả khi có lỗi xảy ra.
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
