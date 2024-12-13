import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Input, Pagination, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import useSWR from 'swr';
import useAdminUsersStore from '../../stores/adminUsersStore';
import { AdminUser } from '../../types/user';
import useUserStore from '../../stores/UserStore';

function AdminUsers() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const variants = ['Aktiv', 'Afmeldt'];
  const [searchTerm, setSearchTerm] = useState('');
  const [curPage, setCurPage] = useState(1);
  const { adminUsers, setAdminUsers } = useAdminUsersStore();
  const { userInfo } = useUserStore();
  const { data, error } = useSWR(apiUrl + `/admin/users/${userInfo?.fitness_center_id}/${1}/10`, {
    onSuccess: (data) => {
      setAdminUsers(data);
    },
  });
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  // Before the return statement
  if (!adminUsers) return null;

  const handleChangePage = async (page: number) => {
    const response = await fetch(
      apiUrl + `/admin/users/${userInfo?.fitness_center_id}/${page}/10`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_API_KEY as string,
        },
      }
    );
    const data = await response.json();
    setAdminUsers(data);
  };

  const handleSearchChange = async (
    searchQuery: string,
    page: number = 1,
    isFromPagination: boolean = false
  ) => {
    // Only update searchTerm if not from pagination
    if (!isFromPagination) {
      setSearchTerm(searchQuery);
    }

    try {
      const response = await fetch(
        apiUrl + `/admin/search-users/${userInfo?.fitness_center_id}/${page}/10/${searchQuery}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': import.meta.env.VITE_API_KEY as string,
          },
        }
      );
      const data = await response.json();

      if (data.detail) {
        handleChangePage(1);
      } else {
        setAdminUsers(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
      handleChangePage(1);
    }
  };
  // Input handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleSearchChange(value);
  };

  // Pagination handler
  const handlePaginationChange = (page: number) => {
    setCurPage(page);
    if (searchTerm.trim() === '') {
      handleChangePage(page);
    } else {
      handleSearchChange(searchTerm, page, true);
    }
  };

  // update user Status
  const handleUpdateUserStatus = async (userId: number, is_member: boolean) => {
    try {
      // /api/admin/membership
      const response = await fetch(apiUrl + `/admin/membership`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_API_KEY as string,
        },
        body: JSON.stringify({
          user_id: userId,
          is_member: !is_member,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message) {
        console.log('User status updated successfully');
        const newUsers = adminUsers;
        newUsers.users = newUsers.users.map((user: AdminUser) => {
          if (user.user_id === userId) {
            user.is_member = !is_member;
          }
          return user;
        });
        setAdminUsers(newUsers);
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  // setup delete user in the future

  console.log(adminUsers);
  return (
    <>
      <div className='sm:hidden grid gap-4'>
        <Input onChange={handleInputChange} type='text' label='Søg' size='sm' value={searchTerm} />
        {adminUsers?.users?.map((user, index) => (
          <div
            key={index}
            className='grid grid-cols-2 gap-4 justify-between items-center bg-default-100 p-4 rounded'
          >
            <div className='flex flex-col gap-2'>
              <p className='font-bold'>{user.first_name}</p>

              <p>
                <span className='text-xs text-default-700'>Center</span>
                <br />
                currentCenter
              </p>
              <p>
                <span className='text-xs text-default-700'>Medlemskab</span>
                <br />
                {user.is_member ? 'Ja' : 'Nej'}
              </p>
            </div>
            <Select
              color={user.is_member ? 'success' : 'danger'}
              label='Status'
              size='sm'
              defaultSelectedKeys={[user.is_member ? 'Aktiv' : 'Afmeldt']}
            >
              {variants.map((variant) => (
                <SelectItem key={variant} value={variant}>
                  {variant}
                </SelectItem>
              ))}
            </Select>
          </div>
        ))}
        <Pagination
          onChange={handlePaginationChange}
          total={adminUsers?.total_pages || 1}
          page={curPage}
          loop
          showControls
          color='secondary'
          initialPage={1}
        />
      </div>
      <div className='max-sm:hidden grid gap-4 justify-items-center w-full'>
        <Input onChange={handleInputChange} type='text' label='Søg' size='sm' value={searchTerm} />
        <Table aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>NAVN</TableColumn>
            <TableColumn>CENTER</TableColumn>
            <TableColumn align='center'>MEDLEMSKAB</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {adminUsers.users?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>set to current</TableCell>
                <TableCell>{user.is_member ? 'Ja' : 'Nej'}</TableCell>
                <TableCell>
                  <Select
                    onChange={() => handleUpdateUserStatus(user.user_id, user.is_member)}
                    className='w-32'
                    size='sm'
                    color={user.is_member ? 'success' : 'danger'}
                    defaultSelectedKeys={[user.is_member ? 'Aktiv' : 'Afmeldt']}
                  >
                    {variants.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          onChange={handlePaginationChange}
          total={adminUsers?.total_pages || 1}
          page={curPage}
          loop
          showControls
          color='secondary'
          initialPage={1}
        />
      </div>
    </>
  );
}

export default AdminUsers;
