'use client'
import { v4 as uuidv4 } from 'uuid';
import ClientHeader from '@/components/ClientHeader';
import OrderPanel from '@/components/OrderPanel';
import CategoryGrid from '@/components/CategoryGrid';
import ProductList from '@/components/ProductList';
import PaymentModal from '@/components/PaymentModal';
import ClientPage from '@/components/ClientPage';
import { OrderItem, Product, Client } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@/components/Modal';
import { log } from 'node:util';
import api, {dataBase} from "@/data/dataBase";
type ShiftItem = {
  id: number; // или string, в зависимости от твоих данных
  // другие поля, если есть
};

type ShiftState = {
  openedShift: ShiftItem[];
  modal:boolean;
  closeModal:boolean;
  cashDrawer: number
};
function Page() {


  const [activeTab, setActiveTab] = useState<'orders' | 'check' | 'client'>('check');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productView, setProductView] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [categoryList, setCategoryList] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [shift, setShift] = useState<ShiftState>({openedShift:[],cashDrawer:0,modal:false,closeModal:false});
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    setOrderItems([]);
  };

  const addToOrder = (product: Product) => {
    const existingItem = orderItems.find(item => item.productId === product.id);

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem: OrderItem = {
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      };

      setOrderItems([...orderItems, newItem]);
    }
  };

  const removeFromOrder = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(id);
      return;
    }

    setOrderItems(orderItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setProductView(true);
  };

  const handleBackToCategories = () => {
    setProductView(false);
    setActiveCategory(null);
  };

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setActiveTab('check');
  };
  const sendOrderToServer = async (typeOfPayment) => {
    if (!selectedClient) {
      alert("Сначала выберите клиента");
      return;
    }

    const payload = {
      customerId: selectedClient.id,
      totalAmount,
      employeeId: 1,
      orderDate: new Date().toISOString(),
      typeOfPayment,
      menuItems: orderItems.map(item => ({
        menuId: item.productId,
        quantity: item.quantity
      }))
    };

    try {
      console.log(payload);
      const res = await api.post('/orders',payload)
      console.log('Заказ успешно отпр авлен:', res.data);
      handlePaymentComplete(); // очищаем корзину после успешной отправки
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      alert("Не удалось отправить заказ");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, shiftRes, categoryRes] = await Promise.all([
          api.get('/menu'),
          api.get('posShift'),
          api.get('/categories'),
        ]);

        setMenuData(menuRes.data);
        setCategoryList(categoryRes.data);

        const openedShift = shiftRes.data;
        console.log(openedShift);
        setShift(prev => ({
          ...prev,
          openedShift,
          modal: openedShift.length === 0,
        }));

      } catch (e) {
        console.error('Ошибка при загрузке данных:', e);
      }
    };

    fetchData();
  }, []);

  const onOpenShift = async () => {
    try {
      const res =await api.post('/posShift',{
        cashDrawer: shift.cashDrawer
      })
      console.log('Смена открыта:', res.data);
      setShift(prevState => ({
        ...prevState,
        modal: false
      }));
    } catch (error) {
      console.error('Ошибка при открытии смены:', error);
    }
  };


  async function handleCloseShift() {
   setOpenSettingsModal(false)
    setShift((prevState)=>{
      return {...prevState, closeModal: true};
    })

  }
  const onCloseShift = async ()=>{
  try {
    const res = await api.post('/posShift/close',{cashDrawer:shift.cashDrawer});
    setShift((prevState)=>{
      return {...prevState, closeModal: false};
    })
  }catch (e){
    console.log('error', e);
  }
  }


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ClientHeader activeTab={activeTab} setActiveTab={setActiveTab} setOpenModal={setOpenSettingsModal}  />
      {openSettingsModal && (
        <div
          className="fixed inset-0 bg-gray-400 bg-opacity-10 z-50 flex items-center justify-center"
          onClick={() => setOpenSettingsModal(false)}
        >
          <div
            className="bg-white w-2/3 h-3/4 rounded-2xl shadow-lg p-6 flex"
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на саму модалку
          >
            <div className="w-1/4 bg-blue-500 text-white rounded-l-2xl p-4 space-y-4">
              <ul className="space-y-2 font-semibold">
                <li className="cursor-pointer hover:underline">Транзакции</li>
                <li className="cursor-pointer hover:underline">Список чеков</li>
                <li className="cursor-pointer hover:underline">Посмотреть отчет</li>
                <li>
                  <button onClick={()=>handleCloseShift()} className="w-full py-2 mt-4 bg-white text-blue-500 rounded hover:bg-gray-100">
                    Закрыть смену
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-50 rounded-r-2xl p-6">
              <p className="text-gray-600">Здесь будут настройки или отчёты</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'client' ? (
        <ClientPage onSelectClient={handleClientSelect} />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 border-r border-gray-300 overflow-hidden flex flex-col">
            <Modal shift={shift} setShift={setShift} onOpen={onOpenShift} modal={shift.modal} closeModal={shift.closeModal} onClose={onCloseShift}/>
            <OrderPanel
              orderItems={orderItems}
              totalAmount={totalAmount}
              removeFromOrder={removeFromOrder}
              updateQuantity={updateQuantity}
              onPaymentClick={() => setIsPaymentModalOpen(true)}
            />
          </div>

          <div className="w-1/2 overflow-hidden flex flex-col">
            {productView && activeCategory ? (
              <>
                <div className="bg-gray-200 p-2">
                  <button
                    className="flex items-center text-blue-600"
                    onClick={handleBackToCategories}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span>Назад к категориям</span>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <ProductList
                    products={menuData}
                    activeCategory={activeCategory}
                    addToOrder={addToOrder}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <CategoryGrid
                  categories={categoryList}
                  activeCategory={activeCategory}
                  setActiveCategory={handleCategoryClick}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onComplete={handlePaymentComplete}
        onSend={sendOrderToServer}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default Page;