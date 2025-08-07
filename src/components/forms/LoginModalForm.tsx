import React, {useEffect, useState} from 'react'
import { useModal } from '@/hooks/useModal'
import { useLoading } from '@/hooks/useLoading'
import { useAuth } from '@/hooks/useAuth'
import loginPicture from '@/assets/login-picture.svg'
import closeModal from '@/assets/close-modal.svg'
import { notification } from 'antd'
import 'antd/dist/reset.css'; // hoặc 'antd/dist/antd.css' nếu dùng antd < 5

export function LoginModal() {
    const { isLoginModalOpen, closeLoginModal, openSignupModal } = useModal()
    const { showLoading, hideLoading } = useLoading()
    const { login, error, clearError } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        console.log('LoginModal mounted')
        // Reset form fields when modal opens
        if (error) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: error,
                placement: 'topRight',
                duration: 3
            })
        }
    }, [error])

    if (!isLoginModalOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()

        try {
            showLoading('Đang đăng nhập...')
            const success = await login(email, password)
            if (success) {
                closeLoginModal()
            }
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            hideLoading()
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                style={{ zIndex: 1 }} onClick={closeLoginModal}
            />

            {/* Close Button - OUTSIDE modal container */}
            <button
                onClick={closeLoginModal}
                style={{
                    position: 'fixed',
                    width: '42px',
                    height: '42px',
                    left: '50%',
                    top: 'calc(50% - 240.45px)', // 221.45 = 442.91/2
                    marginLeft: '379px', // 800/2 - 21 (half button width)
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    border: 'none',
                    color: '#787878',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99999,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
            >
                <img src={closeModal} alt="Close" />
            </button>

            {/* Modal Container */}
            <div
                className="relative flex overflow-hidden"
                style={{
                    width: '800px',
                    height: '442.91px',
                    background: '#F8F8F8',
                    borderRadius: '20px',
                    zIndex: 2
                }}
            >
                {/* Left Side - Form */}
                <div
                    className="relative bg-white"
                    style={{
                        width: '500px',
                        height: '100%',
                        borderRadius: '20px 0px 0px 20px'
                    }}
                >
                    {/* Back Arrow */}
                    {/*<button*/}
                    {/*    onClick={closeLoginModal}*/}
                    {/*    className="absolute bg-none border-none cursor-pointer text-gray-500"*/}
                    {/*    style={{*/}
                    {/*        width: '21px',*/}
                    {/*        height: '21px',*/}
                    {/*        left: '45px',*/}
                    {/*        top: '40px',*/}
                    {/*        fontSize: '24px'*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <img src={loginArrow} alt="Login Arrow" />*/}
                    {/*</button>*/}

                    {/* Heading */}
                    <h4
                        className="absolute font-medium text-gray-900"
                        style={{
                            width: '256.59px',
                            height: '29.5px',
                            left: '45px',
                            top: '93.09px',
                            fontFamily: 'Inter',
                            fontSize: '24px',
                            lineHeight: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#242424'
                        }}
                    >
                        Đăng nhập bằng email
                    </h4>

                    {/* Subtitle */}
                    <div
                        className="absolute text-gray-600"
                        style={{
                            width: '268.43px',
                            height: '20px',
                            left: '45px',
                            top: '131.69px',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '15px',
                            lineHeight: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#242424'
                        }}
                    >
                        Nhập email và mật khẩu tài khoản Tiki
                    </div>

                    {/* Error Display */}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="absolute"
                        style={{
                            height: '187.19px',
                            left: '45px',
                            right: '45px',
                            top: '171.69px'
                        }}
                    >
                        {/* Email Input */}
                        <div
                            className="absolute bg-white"
                            style={{
                                height: '36.09px',
                                left: '0px',
                                right: '0px',
                                top: '0px'
                            }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="acb@email.com"
                                className="w-full h-full border-none outline-none bg-transparent"
                                style={{
                                    fontFamily: 'Inter',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                    color: email ? '#242424' : '#999999'
                                }}
                                required
                            />
                            {/* Divider */}
                            <div
                                className="absolute bg-gray-300"
                                style={{
                                    height: '1px',
                                    left: '0%',
                                    right: '0%',
                                    bottom: '0px'
                                }}
                            />
                        </div>

                        {/* Password Input */}
                        <div
                            className="absolute bg-white"
                            style={{
                                height: '36.09px',
                                left: '0px',
                                right: '0px',
                                top: '51.09px'
                            }}
                        >
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mật khẩu"
                                className="w-full h-full border-none outline-none bg-transparent"
                                style={{
                                    fontFamily: 'Inter',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                    color: password ? '#242424' : '#999999'
                                }}
                                required
                            />
                            {/* Hiện/Ẩn Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute bg-none border-none cursor-pointer"
                                style={{
                                    width: '30.61px',
                                    height: '17px',
                                    left: '379.77px',
                                    top: '9.5px',
                                    fontFamily: 'Inter',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#0D5CB6'
                                }}
                            >
                                {showPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                            {/* Divider */}
                            <div
                                className="absolute bg-gray-300"
                                style={{
                                    height: '1px',
                                    left: '0%',
                                    right: '0%',
                                    bottom: '0px'
                                }}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="absolute border-none cursor-pointer text-white flex items-center justify-center"
                            style={{
                                height: '49px',
                                left: '0px',
                                right: '0px',
                                top: '128.19px',
                                background: '#FF424E',
                                borderRadius: '4px',
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                fontSize: '20px',
                                lineHeight: '23px'
                            }}
                        >
                            Đăng nhập
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div
                        className="absolute cursor-pointer"
                        style={{
                            width: '99.95px',
                            height: '14.95px',
                            left: '45px',
                            top: '378.88px',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '13px',
                            lineHeight: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#0D5CB6'
                        }}
                    >
                        Quên mật khẩu?
                    </div>

                    <div
                        className="absolute"
                        style={{
                            left: '45px',
                            top: '403.97px',
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '13px',
                            lineHeight: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#787878'
                        }}
                    >
                        <span>Chưa có tài khoản? </span>
                        <span
                            onClick={openSignupModal}
                            className="cursor-pointer"
                            style={{
                                color: '#0D5CB6',
                                marginLeft: '4px'
                            }}
                        >
                            Tạo tài khoản
                        </span>
                    </div>
                </div>

                {/* Right Side - Background */}
                <div
                    className="flex-1 flex flex-col items-center justify-center"
                    style={{
                        background: '#DEEBFF',
                        borderRadius: '0px 20px 20px 0px'
                    }}
                >
                    {/* Picture Container */}
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '10px',
                            marginBottom: '30px'
                        }}
                    >
                        <img
                            src={loginPicture}
                            alt="Login Robot"
                            className="w-40 h-40 object-contain"
                        />
                    </div>

                    {/* Heading */}
                    <h4
                        className="font-medium text-center mb-2"
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            fontSize: '18px',
                            lineHeight: '24px',
                            color: '#0A68FF'
                        }}
                    >
                        Mua sắm tại Tiki
                    </h4>

                    {/* Subtitle */}
                    <div
                        className="text-center"
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: '#0A68FF'
                        }}
                    >
                        Siêu ưu đãi mỗi ngày
                    </div>
                </div>
            </div>
        </div>
    )
}
