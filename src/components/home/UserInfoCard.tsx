import { useDisclosure } from '@nextui-org/modal';
import EditProfile from './EditProfile';
import { memo } from 'react';
import useUserStore from '../../stores/UserStore';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/react';
import LatestBooking from './LatestBooking';

interface Props {
  lastestBooking: boolean;
}
const UserInfoCard = memo(({ lastestBooking }: Props) => {
  const { userInfo } = useUserStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(lastestBooking);
  return (
    <div className='flex flex-col gap-2 cursor-pointer' onClick={onOpen}>
      <Card className='h-full bg-default-100 rounded-md group'>
        <CardHeader className='flex justify-between items-start gap-3'>
          <div className='flex flex-col px-2'>
            <p className='text-md'>{userInfo?.first_name + ' ' + userInfo?.last_name}</p>
            <p className='text-small text-default-500'>Medlemskab</p>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 hidden group-hover:block'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
            />
          </svg>
        </CardHeader>
        <Divider />
        <CardBody className='flex flex-col gap-4 h-fit'>
          <div className='flex gap-2 justify-between px-2 w-full'>
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
        </CardBody>
        <Divider />
        <CardFooter className='flex flex-col gap-2'>
          <span className='px-2 text-small text-default-500'>Seneste Booking</span>
          {lastestBooking && <LatestBooking />}
        </CardFooter>
      </Card>
      <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
});

export default UserInfoCard;
