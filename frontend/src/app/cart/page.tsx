'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  User, 
  Phone, 
  MapPin,
  Pill,
  Sparkles,
  Lock
} from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Run only on client side
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && isInitialLoad && cartItems.length > 0) {
      setSelectedItemIds(cartItems.map(item => item.id));
      setIsInitialLoad(false);
    }
  }, [mounted, cartItems, isInitialLoad]);

  const selectedItems = cartItems.filter(item => selectedItemIds.includes(item.id));
  const selectedTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Shipping fee logic: 20k, free for orders > 300k
  const shippingFee = selectedTotal > 300000 || selectedTotal === 0 ? 0 : 20000;
  const finalTotal = selectedTotal + shippingFee;

  // Format currency helper
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItemIds.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
      return;
    }

    if (!customerName.trim() || !phoneNumber.trim() || !deliveryAddress.trim()) {
      alert('Vui lòng điền đầy đủ thông tin nhận hàng.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API request to create order
    setTimeout(() => {
      const randomCode = 'PAC-ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderCode(randomCode);
      setOrderSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCloseSuccessModal = () => {
    selectedItemIds.forEach(id => removeFromCart(id));
    setSelectedItemIds([]);
    setOrderSuccess(false);
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#024ad8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud text-ink font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-fog shadow-sm py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#024ad8] text-white p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Pill size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight text-ink">
              Pharma<span className="text-[#024ad8]">Assist</span>
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-xs text-charcoal hover:text-[#024ad8] transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            Tiếp tục mua sắm
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-ink mb-8 flex items-center gap-2">
          <ShoppingBag className="text-[#024ad8]" />
          Giỏ Hàng Của Bạn
          <span className="text-sm font-normal text-graphite">({cartCount} sản phẩm)</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-hairline rounded-2xl shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto mt-8">
            <span className="text-6xl">🛒</span>
            <h2 className="text-lg font-bold text-ink">Giỏ hàng trống</h2>
            <p className="text-sm text-graphite max-w-xs">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy quay lại trang chủ để khám phá các sản phẩm bảo vệ sức khỏe.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-[#024ad8] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg"
            >
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-hairline rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-4 md:px-6 border-b border-hairline bg-cloud/30">
                  <input 
                    type="checkbox" 
                    checked={cartItems.length > 0 && selectedItemIds.length === cartItems.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItemIds(cartItems.map(item => item.id));
                      } else {
                        setSelectedItemIds([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-steel text-[#024ad8] focus:ring-[#024ad8] cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-ink">Chọn tất cả ({cartItems.length} sản phẩm)</span>
                </div>
                <div className="p-4 md:p-6 divide-y divide-fog">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                      {/* Product details */}
                      <div className="flex items-center gap-4 flex-1">
                        <input 
                          type="checkbox" 
                          checked={selectedItemIds.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItemIds(prev => [...prev, item.id]);
                            } else {
                              setSelectedItemIds(prev => prev.filter(id => id !== item.id));
                            }
                          }}
                          className="w-4 h-4 rounded border-steel text-[#024ad8] focus:ring-[#024ad8] cursor-pointer shrink-0"
                        />
                        <div className="w-16 h-16 bg-cloud border border-fog rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0">
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-contain" 
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== 'https://placehold.co/300x300?text=No+Image') {
                                  target.src = 'https://placehold.co/300x300?text=No+Image';
                                }
                              }}
                            />
                          ) : (
                            <Pill className="text-graphite w-6 h-6" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-ink text-sm md:text-base leading-snug line-clamp-2 max-w-md">
                            {item.name}
                          </h3>
                          <p className="text-xs text-graphite">
                            Hoạt chất: <span className="font-medium text-charcoal">{item.activeIngredient}</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#024ad8]">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-xs text-graphite">/ {item.unit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls and Remove button */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-steel rounded-lg bg-cloud overflow-hidden">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-steel/30 text-graphite hover:text-ink transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-ink">
                            {item.quantity}
                          </span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-steel/30 text-graphite hover:text-ink transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price Subtotal */}
                        <div className="text-right min-w-[90px] hidden sm:block">
                          <span className="text-sm font-bold text-ink block">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        {/* Remove button */}
                        <button 
                          type="button"
                          onClick={() => {
                            removeFromCart(item.id);
                            setSelectedItemIds(prev => prev.filter(id => id !== item.id));
                          }}
                          className="text-graphite hover:text-bloom-coral p-1.5 rounded-lg hover:bg-bloom-coral/10 transition-colors"
                          title="Xóa khỏi giỏ hàng"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Checkout Info & Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white border border-hairline rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="font-bold text-ink text-base uppercase tracking-wider pb-3 border-b border-fog">
                  Tóm Tắt Đơn Hàng
                </h2>
                
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-graphite">
                    <span>Tổng tiền sản phẩm</span>
                    <span className="font-semibold text-charcoal">{formatPrice(selectedTotal)}</span>
                  </div>
                  <div className="flex justify-between text-graphite">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold text-charcoal">
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {shippingFee > 0 && selectedTotal > 0 && (
                    <p className="text-[10px] text-[#024ad8] bg-[#024ad8]/5 p-2 rounded-lg border border-[#024ad8]/10 leading-normal">
                      💡 Mua thêm <strong>{formatPrice(300000 - selectedTotal)}</strong> để được miễn phí vận chuyển.
                    </p>
                  )}
                  <div className="pt-3 border-t border-fog flex justify-between items-center text-ink font-bold text-base">
                    <span>Tổng thanh toán</span>
                    <span className="text-lg text-bloom-coral">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Form or Login Alert */}
              <div className="bg-white border border-hairline rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="font-bold text-ink text-base uppercase tracking-wider pb-3 border-b border-fog flex items-center gap-1.5">
                  <Truck size={18} className="text-[#024ad8]" />
                  Thông Tin Nhận Hàng
                </h2>

                {isAuthenticated ? (
                  <form onSubmit={handleCheckout} className="space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-graphite uppercase">
                        Họ và tên người nhận *
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="fullName"
                          placeholder="Nhập họ và tên..."
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-cloud border border-steel focus:border-[#024ad8] focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8]/15"
                        />
                        <User className="absolute left-3 top-2.5 text-graphite" size={16} />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-graphite uppercase">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          id="phone"
                          placeholder="Nhập số điện thoại..."
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-cloud border border-steel focus:border-[#024ad8] focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8]/15"
                        />
                        <Phone className="absolute left-3 top-2.5 text-graphite" size={16} />
                      </div>
                    </div>

                    {/* Address Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="address" className="text-xs font-semibold text-graphite uppercase">
                        Địa chỉ nhận hàng *
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="address"
                          placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-cloud border border-steel focus:border-[#024ad8] focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8]/15"
                        />
                        <MapPin className="absolute left-3 top-2.5 text-graphite" size={16} />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-graphite uppercase">
                        Phương thức thanh toán
                      </span>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {/* COD */}
                        <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === 'COD' ? 'border-[#024ad8] bg-[#024ad8]/5' : 'border-steel hover:bg-cloud'}`}>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="payment" 
                              value="COD"
                              checked={paymentMethod === 'COD'}
                              onChange={() => setPaymentMethod('COD')}
                              className="text-[#024ad8] focus:ring-[#024ad8]"
                            />
                            <div className="text-xs font-semibold">Thanh toán khi nhận hàng (COD)</div>
                          </div>
                          <span className="text-base">💵</span>
                        </label>

                        {/* Bank Transfer */}
                        <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === 'BANK' ? 'border-[#024ad8] bg-[#024ad8]/5' : 'border-steel hover:bg-cloud'}`}>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="payment" 
                              value="BANK"
                              checked={paymentMethod === 'BANK'}
                              onChange={() => setPaymentMethod('BANK')}
                              className="text-[#024ad8] focus:ring-[#024ad8]"
                            />
                            <div className="text-xs font-semibold">Chuyển khoản ngân hàng</div>
                          </div>
                          <CreditCard size={16} className="text-graphite" />
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#024ad8] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang xử lý đơn hàng...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} />
                          Xác nhận đặt hàng - {formatPrice(finalTotal)}
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-4">
                    <div className="bg-amber-50 text-amber-500 p-4 rounded-full border border-amber-100 animate-pulse">
                      <Lock size={28} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-ink text-sm">Đăng nhập để đặt hàng</h3>
                      <p className="text-xs text-graphite max-w-[220px] mx-auto leading-normal">
                        Bạn cần đăng nhập tài khoản để thực hiện quá trình điền thông tin và thanh toán đơn hàng này.
                      </p>
                    </div>
                    <Link
                      href="/login?redirect=/cart"
                      className="w-full bg-[#024ad8] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-xs text-center flex items-center justify-center gap-1.5"
                    >
                      Đăng nhập ngay
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-hairline rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 text-center space-y-5 animate-scale-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-ink">Đặt Hàng Thành Công!</h2>
              <p className="text-sm text-graphite leading-relaxed">
                Cảm ơn bạn đã lựa chọn PharmaAssist. Đơn hàng của bạn đang được xử lý và chuẩn bị giao.
              </p>
            </div>

            <div className="bg-cloud border border-steel p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-graphite border-b border-fog pb-2">
                <span>Mã đơn hàng:</span>
                <span className="font-mono font-bold text-[#024ad8]">{orderCode}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-graphite pt-1">
                <span>Tổng thanh toán:</span>
                <span className="font-bold text-bloom-coral">{formatPrice(finalTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-graphite">
                <span>Phương thức:</span>
                <span className="font-semibold text-ink">{paymentMethod === 'COD' ? 'Nhận hàng (COD)' : 'Chuyển khoản'}</span>
              </div>
            </div>

            <button 
              onClick={handleCloseSuccessModal}
              className="w-full bg-[#024ad8] hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles size={16} />
              Quay lại Trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
