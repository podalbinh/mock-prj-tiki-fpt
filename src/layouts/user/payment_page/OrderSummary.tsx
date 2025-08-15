import {Card, Button, App} from "antd";
import { DownOutlined } from "@ant-design/icons";
import {useEffect, useState, useMemo, useCallback, useRef} from "react";
import {useLocation} from "react-router-dom";
import {useBook} from "@/hooks/useBook.ts";
import {formattedPrice} from "@/utils/priceHelper.ts";
import {useNavigate} from "react-router-dom";
import {useOrder} from "@/hooks/useOrder.ts";
import {useCart} from "@/hooks/useCart.ts";
import type { CartItem } from "@/constant/interfaces";

export default function OrderSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const {createOrders} = useOrder()
    const { getBookById } = useBook();
    const [total, setTotal] = useState<number>(0);
    const { cartItems, clearCart } = useCart();
    const { message } = App.useApp();
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    
    // Use refs to track fetched items and prevent duplicate API calls
    const fetchedItems = useRef<Set<number>>(new Set());
    const bookDataRef = useRef<Map<number, any>>(new Map());
    const isCalculating = useRef(false);

    // Memoize selected items to avoid unnecessary recalculations
    const selectedItems = useMemo(() => {
        if (location.state?.selectedCartItems) {
            return location.state.selectedCartItems;
        }
        if (location.state?.bookId) {
            return [{ productId: location.state.bookId, quantity: location.state.quantity || 1 }];
        }
        return cartItems;
    }, [location.state, cartItems]);

    // Memoize user info to avoid unnecessary re-renders
    const userInfo = useMemo(() => {
        if (!userJson) return null;
        try {
            return JSON.parse(userJson);
        } catch {
            return null;
        }
    }, [userJson]);

    // Memoize the total calculation function - remove getBookById from dependencies
    const calculateTotal = useCallback(async () => {
        console.log('OrderSummary: calculateTotal called with selectedItems:', selectedItems);
        
        if (!selectedItems || selectedItems.length === 0) {
            setTotal(0);
            return;
        }

        // Prevent multiple simultaneous calculations
        if (isCalculating.current) {
            console.log('OrderSummary: Already calculating, skipping...');
            return;
        }

        console.log('OrderSummary: Starting calculation...');
        isCalculating.current = true;

        try {
            const totalPrice = await Promise.all(
                selectedItems.map(async (item: any) => {
                    if (!item.productId) return 0;
                    
                    console.log(`OrderSummary: Processing item ${item.productId}`);
                    
                    // Check if we already have the book data in ref
                    if (bookDataRef.current.has(item.productId)) {
                        console.log(`OrderSummary: Using cached book data for ID ${item.productId}`);
                        const cachedBook = bookDataRef.current.get(item.productId);
                        return cachedBook.listPrice * (item.quantity || 1);
                    }
                    
                    // Check if we've already fetched this item in this session
                    if (fetchedItems.current.has(item.productId)) {
                        console.log(`OrderSummary: Already fetched book ${item.productId}, using cached data`);
                        // Get cached data from useBook hook instead of returning 0
                        const cachedData = await getBookById(item.productId);
                        return cachedData.listPrice * (item.quantity || 1);
                    }
                    
                    console.log(`OrderSummary: Fetching book ${item.productId}`);
                    const data = await getBookById(item.productId);
                    fetchedItems.current.add(item.productId);
                    
                    // Store the book data in ref for future use
                    bookDataRef.current.set(item.productId, data);
                    
                    return data.listPrice * (item.quantity || 1);
                })
            );

            const sum = totalPrice.reduce((acc, price) => acc + (price || 0), 0);
            console.log('OrderSummary: Total calculated:', sum);
            setTotal(sum);
        } catch (error) {
            console.error('OrderSummary: Error calculating total:', error);
            setTotal(0);
        } finally {
            isCalculating.current = false;
            console.log('OrderSummary: Calculation completed');
        }
    }, [selectedItems]); // Remove bookData from dependencies

    // Only recalculate total when selectedItems change
    useEffect(() => {
        console.log('OrderSummary: selectedItems changed:', selectedItems);
        // Reset fetched items when selectedItems change
        fetchedItems.current.clear();
        // Clear bookData when selectedItems change to force fresh fetch
        bookDataRef.current.clear();
        // Force recalculation only when selectedItems actually change
        if (selectedItems.length > 0) {
            console.log('OrderSummary: Calling calculateTotal with', selectedItems.length, 'items');
            calculateTotal();
        }
    }, [selectedItems]); // Only depend on selectedItems

    const onClick = useCallback(async () => {
        if (!userInfo?.fullName || !userInfo?.address || !userInfo?.phone) {
            message.error("Chưa có đầy đủ thông tin khách hàng để giao hàng")
            return;
        }

        try {
            if (location.state?.selectedCartItems) {
                const selectedItems = location.state.selectedCartItems;
                const data = selectedItems
                    .filter((item: any) => item.productId !== undefined)
                    .map((item: any) => ({
                        productId: item.productId || 0,
                        quantity: item.quantity || 1
                    }));

                await createOrders(data);
            } else if (location.state?.bookId) {
                await createOrders([{productId: location.state.bookId, quantity: location.state.quantity || 1}])
            } else if (cartItems.length > 0) {
                const data = cartItems
                    .filter((item): item is CartItem =>
                        item.productId !== undefined
                    )
                    .map((item) => ({
                        productId: item.productId || 0,
                        quantity: item.quantity || 1
                    }));

                await createOrders(data);
            }
        } catch (e) {
            console.error(e);
            message.error("Lưu đơn hàng thất bại")
            return;
        }
        message.success("Lưu đơn hàng thành công")
        clearCart();
        navigate("/confirm");
    }, [userInfo, location.state, cartItems, createOrders, clearCart, navigate, message]);

    // Memoize shipping fee and discount calculations
    const shippingFee = useMemo(() => 25000, []);
    const discount = useMemo(() => 25000, []);
    const finalTotal = useMemo(() => total, [total]);

    return (
        <Card className="p-0 rounded-lg overflow-hidden">
            <div className={"flex flex-col"}>
                {/* Tiêu đề */}
                <div className="pb-4">
                    <h2 className="text-base font-semibold">Đơn hàng</h2>
                    <div className="text-sm text-gray-500 mt-0.5 flex items-center">
                        1 sản phẩm.
                        <span className="text-blue-500 ml-1 flex items-center cursor-pointer">
                        Xem thông tin <DownOutlined className="ml-1 text-xs" />
                      </span>
                    </div>
                </div>

                {/* Chi tiết giá */}
                <div className="py-3 space-y-2 text-sm border-t border-b border-gray-200">
                    <div className="flex justify-between text-gray-600">
                        <span>Tổng tiền hàng</span>
                        <span>{formattedPrice(finalTotal)}đ</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>{formattedPrice(shippingFee)}đ</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Giảm giá trực tiếp</span>
                        <span>0đ</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        Giảm giá vận chuyển
                        <span className="ml-1 text-gray-400">ⓘ</span>
                      </span>
                        <span>-{formattedPrice(discount)}đ</span>
                    </div>
                </div>

                {/* Tổng tiền thanh toán */}
                <div className="py-3">
                    <div className="flex justify-between items-end">
                        <span className="font-semibold text-base">Tổng tiền thanh toán</span>
                        <span className="text-red-500 font-semibold text-lg">{formattedPrice(finalTotal)} đ</span>
                    </div>
                    <p className="text-green-600 text-sm mt-0.5 text-right">Tiết kiệm {formattedPrice(discount)} đ</p>
                    <p className="text-gray-400 text-xs mt-1 text-right">
                        (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                    </p>
                </div>

                {/* Nút đặt hàng */}
                <div className="pb-4">
                    <Button
                        type="primary"
                        onClick={onClick}
                        className="w-full h-11 bg-red-500 text-white font-semibold rounded"
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </Card>
    );
}
