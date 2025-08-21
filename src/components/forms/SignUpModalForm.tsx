import React, { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useLoading } from '@/hooks/useLoading'
import signupPicture from '../../../public/assets/login-picture.svg'
import closeModal from '../../../public/assets/close-modal.svg'
import loginArrow from "../../../public/assets/login-arrow.svg";
import { Button, Input, Modal, notification } from 'antd'
import 'antd/dist/reset.css'
import {useRegister} from "@/hooks/useRegister.ts";

export function SignupModal() {
    const { isSignupModalOpen, closeSignupModal, openLoginModal } = useModal()
    const { showLoading, hideLoading } = useLoading()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    // local visibility toggles handled by AntD Input.Password, keep defaults hidden
    const [error, setError] = useState('')
    const { register, error: userError, setError: setUserError } = useRegister();

    React.useEffect(() => {
        if (error) {
            notification.error({
                message: 'Đăng ký thất bại',
                description: error,
                placement: 'topRight',
                duration: 3
            })
        }
        if (userError) {
            notification.error({
                message: 'Đăng ký thất bại',
                description: userError,
                placement: 'topRight',
                duration: 3
            })
            // Xóa lỗi sau khi đã hiện thông báo
            setUserError('')
        }
    }, [error, setUserError, userError])



    if (!isSignupModalOpen) return null

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setUserError('')
    
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!')
            return
        }
    
        try {
            setSubmitting(true)
            showLoading('Đang tạo tài khoản...')
            const success = await register(email, password, confirmPassword)
    
            if (success) {
                closeSignupModal()
            } else {
                setUserError('Đăng ký không thành công. Vui lòng thử lại.')
            }
        } catch (err: any) {
            console.error('Signup error:', err)
            if (typeof err === 'string') {
                setUserError(err)
            } else if (err?.message) {
                setUserError(err.message)
            } else {
                setUserError('Đã xảy ra lỗi không xác định.')
            }
        } finally {
            hideLoading()
            setSubmitting(false)
        }
    }
    

    return (
        <Modal
            open={isSignupModalOpen}
            onCancel={closeSignupModal}
            footer={null}
            centered
            width={800}
            closable={false}
            maskClosable
            className="signup-modal"
            rootClassName="z-[1500] [&_.ant-modal-mask]:!bg-[rgba(0,0,0,0.5)]"
            classNames={{ content: '!p-0 !bg-transparent !shadow-none !z-[1600]', body: '!p-0' }}
        >
            <div className="relative rounded-2xl overflow-visible bg-[#F8F8F8] h-[442.91px]">
                {/* Custom close button */}
                <button
                    onClick={closeSignupModal}
                    className="absolute -right-6 -top-6 z-50 w-[42px] h-[42px] rounded-full bg-white shadow flex items-center justify-center text-gray-500"
                >
                    <img src={closeModal} alt="Close" />
                </button>

                <div className="flex h-full">
                    {/* Left Side - Form */}
                    <div className="relative w-[500px] h-full bg-white rounded-l-2xl">
                        {/* Back Arrow */}
                        <button
                            onClick={() => { closeSignupModal(); openLoginModal(); }}
                            className="absolute left-[45px] top-10 text-gray-500"
                        >
                            <img src={loginArrow} alt="Login Arrow" />
                        </button>

                        <h4 className="absolute left-[45px] top-[93.09px] font-medium text-[24px] leading-[28px] text-[#242424]">
                            Tạo tài khoản mới
                        </h4>
                        <div className="absolute left-[45px] top-[131.69px] text-[15px] leading-5 text-[#242424]">
                            Nhập thông tin để tạo tài khoản Tiki
                        </div>

                        {/* Form */}
                        <form onSubmit={handleRegister} className="absolute left-[45px] right-[45px] top-[171.69px]">
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
                                    visibilityToggle
                                    iconRender={(visible) => (
                                        <span className="text-[#0D5CB6] text-[14px] leading-4 inline-flex items-center">{visible ? 'Ẩn' : 'Hiện'}</span>
                                    )}
                                    disabled={submitting}
                                />
                            </div>

                            <div className="pt-4 pb-2 border-b border-gray-300 relative">
                                <Input.Password
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Xác nhận mật khẩu"
                                    variant="borderless"
                                    className="!p-0 text-[14px] leading-[17px] text-[#242424] placeholder:text-[#999999] [&_.ant-input-password-icon]:!text-[#0D5CB6] [&_.ant-input-password-icon:hover]:!text-[#0D5CB6]"
                                    visibilityToggle
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
                                Tạo tài khoản
                            </Button>
                        </form>

                        <div className="absolute left-[45px] top-[400px] text-[13px] leading-[15px] text-[#787878]">
                            <span>Đã có tài khoản? </span>
                            <button type="button" onClick={openLoginModal} className="text-[#0D5CB6] ml-1">Đăng nhập</button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 flex flex-col items-center justify-center bg-[#DEEBFF] rounded-r-2xl">
                        <div className="w-[200px] h-[200px] rounded-[10px] mb-[30px] flex items-center justify-center">
                            <img src={signupPicture} alt="Signup Robot" className="w-40 h-40 object-contain" />
                        </div>
                        <h4 className="text-[#0A68FF] font-medium text-[18px] leading-6 mb-2 text-center">Chào mừng đến Tiki</h4>
                        <div className="text-[#0A68FF] text-[14px] leading-5 text-center">Khám phá thế giới mua sắm</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
