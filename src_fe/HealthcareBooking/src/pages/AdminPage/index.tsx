import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogAdd } from "@/components/Admin/ManageUsers/DialogAdd";
import { columns } from "@/components/Admin/ManageUsers/columnTable"
import type { Users } from "@/components/Admin/ManageUsers/columnTable";
import { DataTable } from "@/components/Admin/ManageUsers/TableComponent"
export const AdminPage = () => {
  const data=[
    {
      email: "m@example.com",
      firstName: "John",
      lastName: "Doe",
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quản lý Tài khoản</CardTitle>

          <DialogAdd />
          
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
      
    </div>
  );
};