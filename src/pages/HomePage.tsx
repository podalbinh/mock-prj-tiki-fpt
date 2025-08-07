

import { useModal } from '@/hooks/useModal'
import { LoginModal } from '@/components/forms/LoginModalForm'
import { SignupModal } from '@/components/forms/SignUpModalForm'

const HomePage = () => {
  const { openLoginModal, openSignupModal } = useModal()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Chào mừng đến Tiki
          </h1>
          <p className="text-xl text-gray-600">
            Khám phá thế giới mua sắm trực tuyến
          </p>
          <div className="space-x-4">
            <button
              onClick={openLoginModal}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Đăng nhập
            </button>
            <button
              onClick={openSignupModal}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal Components */}
      <LoginModal />
      <SignupModal />
    </div>
  );
};

export default HomePage;
