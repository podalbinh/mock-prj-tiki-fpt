import React, { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useLoading } from '@/hooks/useLoading'
import { useAuth } from '@/hooks/useAuth'
import loginPicture from '@/assets/login-picture.svg'
import closeModal from '@/assets/close-modal.svg'
import { Button, Input, Modal, notification } from 'antd'
import 'antd/dist/reset.css'

export function LoginModal() {
    const { isLoginModalOpen, closeLoginModal, openSignupModal } = useModal()
    const { showLoading, hideLoading } = useLoading()
    const { login, error, clearError } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
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
            setSubmitting(true)
            showLoading('Đang đăng nhập...')
            const success = await login(email, password)
            if (success) {
                closeLoginModal()
            }
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            hideLoading()
            setSubmitting(false)
        }
    }

    return (
        <Modal
            open={isLoginModalOpen}
            onCancel={closeLoginModal}
            footer={null}
            centered
            width={800}
            closable={false}
            maskClosable
            className="login-modal"
            rootClassName="z-[1500] [&_.ant-modal-mask]:!bg-[rgba(0,0,0,0.5)]"
            classNames={{ content: '!p-0 !bg-transparent !shadow-none !z-[1600]', body: '!p-0' }}
        >
            <div className="relative rounded-2xl overflow-visible bg-[#F8F8F8] h-[442.91px]">
                {/* Custom close button */}
                <button
                    onClick={closeLoginModal}
                    className="absolute -right-6 -top-6 z-50 w-[42px] h-[42px] rounded-full bg-white shadow flex items-center justify-center text-gray-500"
                >
                    <img src={closeModal} alt="Close" />
                </button>

                <div className="flex h-full">
                    {/* Left Side - Form */}
                    <div className="relative w-[500px] h-full bg-white rounded-l-2xl">
                        <h4 className="absolute left-[45px] top-[93.09px] font-medium text-[24px] leading-[28px] text-[#242424]">
                            Đăng nhập bằng email
                        </h4>
                        <div className="absolute left-[45px] top-[131.69px] text-[15px] leading-5 text-[#242424]">
                            Nhập email và mật khẩu tài khoản Tiki
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="absolute left-[45px] right-[45px] top-[171.69px]">
                            <div className="pb-2 border-b border-gray-300">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="acb@email.com"
                                    variant="borderless"
                                    className="!p-0 text-[14px] leading-[17px] text-[#242424] placeholder:text-[#999999]"
                                    disabled={submitting}
                                    required
                                />
                            </div>

                            <div className="pt-4 pb-2 border-b border-gray-300 relative">
                                <Input.Password
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu"
                                    variant="borderless"
                                    className="!p-0 text-[14px] leading-[17px] text-[#242424] placeholder:text-[#999999] [&_.ant-input-password-icon]:!text-[#0D5CB6] [&_.ant-input-password-icon:hover]:!text-[#0D5CB6]"
                                    visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword }}
                                    iconRender={(visible) => (
                                        <span className="text-[#0D5CB6] text-[14px] leading-4 inline-flex items-center">{visible ? 'Ẩn' : 'Hiện'}</span>
                                    )}
                                    disabled={submitting}
                                />
                            </div>

                            <Button
                                htmlType="submit"
                                className="mt-4 w-full !h-[49px] !bg-[#FF424E] !border-[#FF424E] hover:!bg-[#FF424E] hover:!border-[#FF424E] !text-white text-[20px] leading-[23px]"
                                loading={submitting}
                                disabled={submitting}
                            >
                                Đăng nhập
                            </Button>
                        </form>

                        <div className="absolute left-[45px] top-[378.88px] text-[13px] leading-[15px] text-[#0D5CB6] cursor-pointer">
                            Quên mật khẩu?
                        </div>
                        <div className="absolute left-[45px] top-[403.97px] text-[13px] leading-[15px] text-[#787878]">
                            <span>Chưa có tài khoản? </span>
                            <button type="button" onClick={openSignupModal} className="text-[#0D5CB6] ml-1">Tạo tài khoản</button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 flex flex-col items-center justify-center bg-[#DEEBFF] rounded-r-2xl">
                        <div className="w-[200px] h-[200px] rounded-[10px] mb-[30px] flex items-center justify-center">
                            <img src={loginPicture} alt="Login Robot" className="w-40 h-40 object-contain" />
                        </div>
                        <h4 className="text-[#0A68FF] font-medium text-[18px] leading-6 mb-2 text-center">Mua sắm tại Tiki</h4>
                        <div className="text-[#0A68FF] text-[14px] leading-5 text-center">Siêu ưu đãi mỗi ngày</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
