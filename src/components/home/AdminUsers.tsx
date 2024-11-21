import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Input, Pagination, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';

function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  // Maks 10 brugere i fakeData, Hente henter brugere fra databasen ved brug af limit 10
  const fakeData = [
    { name: 'Tony Reichert', medlem: 'JA', center: 'Nørrebro', status: 'Aktiv' },
    { name: 'Zoey Lang', medlem: 'JA', center: 'Østerbro', status: 'Afmeldt' },
    { name: 'Jane Fisher', medlem: 'NEJ', center: 'Vensterbro', status: 'Inaktiv' },
    { name: 'William Howard', medlem: 'JA', center: 'Amager', status: 'Aktiv' },
    { name: 'Tony Reichert', medlem: 'JA', center: 'Nørrebro', status: 'Aktiv' },
    { name: 'Zoey Lang', medlem: 'JA', center: 'Østerbro', status: 'Afmeldt' },
    { name: 'Jane Fisher', medlem: 'NEJ', center: 'Vensterbro', status: 'Inaktiv' },
    { name: 'William Howard', medlem: 'JA', center: 'Amager', status: 'Aktiv' },
    { name: 'Tony Reichert', medlem: 'JA', center: 'Nørrebro', status: 'Aktiv' },
    { name: 'Zoey Lang', medlem: 'JA', center: 'Østerbro', status: 'Afmeldt' },
  ];

  const variants = ['Aktiv', 'Inaktiv', 'Afmeldt'];

  const filteredData = fakeData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /* Logic for at ændre status på bruger skal implimenteres */

  return (
    <div className='grid gap-4 justify-items-center w-full'>
      <Input onChange={handleSearchChange} type='text' label='Søg' />
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>NAVN</TableColumn>
          <TableColumn>CENTER</TableColumn>
          <TableColumn>MEDLEMSKAB</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.center}</TableCell>
              <TableCell>{user.medlem}</TableCell>
              <TableCell>
                <Select
                  color={
                    user.status === 'Aktiv'
                      ? 'success'
                      : user.status === 'Inaktiv'
                        ? 'warning'
                        : 'danger'
                  }
                  label='Status'
                  defaultSelectedKeys={[user.status]}
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
      <Pagination loop showControls color='secondary' total={5} initialPage={1} />
    </div>
  );
}

export default AdminUsers;
