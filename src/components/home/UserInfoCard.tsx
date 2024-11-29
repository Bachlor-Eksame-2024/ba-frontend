import { useDisclosure } from '@nextui-org/modal';
import EditProfile from './EditProfile';

function UserInfoCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className='flex flex-col gap-2 cursor-pointer' onClick={onOpen}>
      <span>Medlem</span>
      <div className='min-w-72 min-h-40 aspect-video bg-default-100 rounded p-4 grid gap-2'>
        <h3 className='text-lg'>Medlemskab</h3>
        <div className='flex gap-2 justify-between'>
          <div className='grid gap-1'>
            <span>Startdato</span>
            <span>Dit center</span>
            <span>Medlemstype</span>
            <span>Medlemskab</span>
          </div>
          <div className='grid gap-1'>
            <span>01/01/2024</span>
            <span>Østerbrogade</span>
            <span>Fri trænning</span>
            <span>299,00 pr. md</span>
          </div>
        </div>
      </div>
      <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default UserInfoCard;
