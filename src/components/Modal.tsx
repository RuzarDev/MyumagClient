'use client'
type ModalProps = {
  shift: any,
  setShift: React.Dispatch<React.SetStateAction<any>>,
  onOpen: () => void,
  modal: boolean;
  closeModal:boolean;
  onClose:()=>void
};


const Modal: React.FC<ModalProps> = (props) => {
  let isOpen = false
  let typeOfAction = ''
  if(props.closeModal || props.modal) {
    isOpen = true
  }
  if(props.modal) {
    typeOfAction='Открыть'
  }
  if(props.closeModal) {
    typeOfAction='Закрыть'
  }

  return (
    <>
      {isOpen && <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center px-4 py-1">
        <div className="border-gray-950 bg-white w-6/12 h-6/12 p-30 rounded-2xl">
          <p className="font-medium text-lg text-black">Чтобы {typeOfAction} смену введите количество денежных средств в
            кассовом
            ящике</p>

          <div><input value={props.shift.cashDrawer}
                      onChange={(e) => props.setShift({ ...props.shift, cashDrawer: e.target.value })}

                      className="border-black border h-7 w-1/2 mt-4 ml-40" type={'number'} /></div>

          <button onClick={typeOfAction =='Открыть' ? ()=>props.onOpen() : ()=>props.onClose()}
                  className="border-green-500 border bg-green-500 mt-10 w-1/2 p-3 ml-40">{typeOfAction} смену
          </button>

        </div>

      </div>}

    </>
  );
};

export default Modal;
