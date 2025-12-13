import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogAdd } from "@/components/Admin/ManageUsers/DialogAdd";
import { columns } from "@/components/Admin/ManageUsers/columnTable";
import { DataTable } from "@/components/Admin/ManageUsers/TableComponent";
import { useState, useEffect } from "react";
import { getUsersListApi } from "@/api/users";

export const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const data = await getUsersListApi();
      console.log("Data tai AdminPage:", data);
      setUsers(data);
    } catch (error) {
      console.error("Lỗi tai data len table pages/AdminPage", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  
  return (
    <div className="container mx-auto py-10">
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quản lý Tài khoản</CardTitle>
          <DialogAdd />
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
};
