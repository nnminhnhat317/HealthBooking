import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { UserFormData } from "@/types/users";
import { userFormSchema } from "@/types/users";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { addUsersApi } from "@/api/users";

export function DialogAdd() {
  const [open, setOpen] = useState(false);
  //useForm
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "exam@gmail.com",
      password: "123456",
      firstName: "Nhat",
      lastName: "Minh",
      address: "",
      gender: "",
      roleId: "",
      positionId: "",
      phoneNumber: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<UserFormData> = async (
    data: z.infer<typeof userFormSchema>
  ) => {
    console.log("click");
    try {
      const res = await addUsersApi(data);
      if (!res.ok) throw new Error("Gọi API thất bại"); //lỗi sẽ chuyển sang catch
      setOpen(false);
    } catch (error) {
      console.log("Lỗi submit form tại component DialogAdd", data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Thêm tài khoản</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* begin form */}
        {/* FieldGroup to nhất bọc tất cả > FieldSet bọc một bộ thông tin gồm các trường không cần nhập liệu FieldLegend,FielDescription > FiledGroup bọc bộ thông tin mà có thể nhập dữ liệu như ô Input,..*/}

        <div>
          <form
            id="form"
            onSubmit={form.handleSubmit(onSubmit, (errors) =>
              console.log("Lỗi nhập liệu của zod", errors)
            )}
          >
            <FieldGroup>
              {/*  */}
              <FieldSet>
                <FieldGroup className="flex flex-row">
                  <div className=" basis-1/2">
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="username">Email</FieldLabel>
                          <Input
                            {...field}
                            id="username"
                            type="text"
                            aria-invalid={fieldState.invalid}
                            placeholder="abc@gmail.com"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          {/* <FieldDescription>
                            Must be at least 6 characters long.
                          </FieldDescription> */}
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="firstName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="firstname">Họ</FieldLabel>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="firstname"
                            type="text"
                            placeholder="Max Leiter"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="lastname">Tên</FieldLabel>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="lastname"
                            type="text"
                            placeholder="Max Leiter"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="address"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="address">Địa chỉ</FieldLabel>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="address"
                            type="text"
                            placeholder="Max Leiter"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className=" basis-1/2">
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                        // orientation="responsive"
                        data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <FieldLabel>Giới tính</FieldLabel>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              <SelectItem value="male">Nam</SelectItem>
                              <SelectItem value="female">Nữ</SelectItem>
                              <SelectItem value="other">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                          <FieldDescription>
                            {/* Select your department or area of work. */}
                          </FieldDescription>
                        </Field>
                      )}
                    />

                    <Controller
                      name="roleId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <FieldLabel>Phân quyền</FieldLabel>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Chọn quyền" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              <SelectItem value="R1">Quản trị viên</SelectItem>
                              <SelectItem value="R2">Bác sĩ</SelectItem>
                              <SelectItem value="R3">Bệnh nhân</SelectItem>
                            </SelectContent>
                          </Select>
                          <FieldDescription>
                            {/* Select your department or area of work. */}
                          </FieldDescription>
                        </Field>
                      )}
                    />

                    <Controller
                      name="positionId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <FieldLabel>Chức danh</FieldLabel>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Chọn chức danh" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              <SelectItem value="P0">Bác sĩ</SelectItem>
                              <SelectItem value="P1">Thạc sĩ</SelectItem>
                              <SelectItem value="P2">Tiến sĩ</SelectItem>
                              <SelectItem value="P3">Phó giáo sư</SelectItem>
                              <SelectItem value="P4">Giáo sư</SelectItem>
                            </SelectContent>
                          </Select>
                          <FieldDescription>
                            {/* Select your department or area of work. */}
                          </FieldDescription>
                        </Field>
                      )}
                    />

                    <Controller
                      name="phoneNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="phoneNumber">
                            Số điện thoại
                          </FieldLabel>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="phoneNumber"
                            type="text"
                            placeholder="Max Leiter"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
