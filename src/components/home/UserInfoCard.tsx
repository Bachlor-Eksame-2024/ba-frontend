import { useDisclosure } from '@nextui-org/modal';
import EditProfile from './EditProfile';
import { memo } from 'react';
import useUserStore from '../../stores/UserStore';

const UserInfoCard = memo(() => {
  const { userInfo } = useUserStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className='flex flex-col gap-2 cursor-pointer' onClick={onOpen}>
      <span>Medlem</span>
      <div className='min-w-72 min-h-40 aspect-video bg-default-100 rounded p-4 grid gap-2'>
        <div>
          <h3 className='text-md'>Medlemskab</h3>
          <span className='text-base text-gray-300'>
            {userInfo?.first_name + ' ' + userInfo?.last_name}
          </span>
        </div>
        <div className='flex gap-2 justify-between'>
          <div className='grid gap-1 text-sm text-gray-300'>
            <span>Dit center</span>
            <span>Medlemstype</span>
            <span>Medlemskab</span>
          </div>
          <div className='grid gap-1 text-right'>
            <span>{userInfo?.fitness_center}</span>
            <span>{userInfo?.is_member ? 'Fri trænning' : 'Løbende'}</span>
            <span>{userInfo?.is_member ? '299,- md.' : '50,- pr.'}</span>
          </div>
        </div>
      </div>
      <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
});

export default UserInfoCard;
