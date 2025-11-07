import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError,
} from "@/components/ui/field";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { UserFormData } from "@/types/users";
import { userFormSchema } from "@/types/users";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { addUsersApi } from "@/api/users";

export function DialogAdd() {
  //useForm
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "exam@gmail.com",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      gender: "Male",
      roleId: undefined,
      positionId: undefined,
      phoneNumber: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<UserFormData> = async (
    data: z.infer<typeof userFormSchema>
  ) => {
    console.log("click");
    try {
      await addUsersApi(data);
      console.log("Form pages/AdminPage submitted:", data);
    } catch (error) {
      console.log("Form pages/AdminPage submit failed:", data);
    }
    console.log(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thêm tài khoản</AlertDialogTitle>
          {/* <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        {/* begin form */}
        {/* FieldGroup to nhất bọc tất cả > FieldSet bọc một bộ thông tin gồm các trường không cần nhập liệu FieldLegend,FielDescription > FiledGroup bọc bộ thông tin mà có thể nhập dữ liệu như ô Input,..*/}
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/*  */}
            <FieldSet>
              <FieldGroup>
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
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <FieldDescription>
                        Must be at least 8 characters long.
                      </FieldDescription>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </Field>
                  )}
                />

                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="firstname">Họ</FieldLabel>
                      <Input
                        {...field}
                        id="firstname"
                        type="text"
                        placeholder="Max Leiter"
                      />
                    </Field>
                  )}
                />

                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="lastname">Tên</FieldLabel>
                      <Input
                        {...field}
                        id="lastname"
                        type="text"
                        placeholder="Max Leiter"
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            {/*  */}
          </FieldGroup>
        </form>
        {/* end form */}
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction>Thêm</AlertDialogAction> */}
          <Field orientation="horizontal">
            <Button type="submit" form="form">
              Submit
            </Button>
          </Field>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
