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

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { useEffect } from "react";

export function TestPage() {
  //useForm
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "e@gmail.com",
      password: "12345678",
      firstName: "NHat",
      lastName: "Minh",
      // address: "",
      // gender: "Male",
      // roleId: undefined,
      // positionId: undefined,
      // phoneNumber: "",
      image: "",
    },
  });

  // const onSubmit: SubmitHandler<UserFormData> = async (
  //   data: z.infer<typeof userFormSchema>
  // ) => {
  //   console.log("click");
  //   try {
  //     await addUsersApi(data);
  //     console.log("Form pages/AdminPage submitted:", data);
  //   } catch (error) {
  //     console.log("Form pages/AdminPage submit failed:", data);
  //   }
  //   console.log(data);
  // };

  function onSubmit(data: z.infer<typeof userFormSchema>) {
    console.log("click");
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // });
  }
  useEffect(() => {
    console.log("form state");
  }, []);
  return (
    <Card className="w-full max-w-sm">
      <div>
        <form
          id="form1"
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors)
          )}
        >
          {/*  */}
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
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
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

            <Button type="submit" form="form1">
              Submit
            </Button>
          </FieldGroup>
          {/*  */}

          {/* end form */}
          {/* <Field> */}
          {/* </Field> */}
        </form>
      </div>
    </Card>

    // <AlertDialog>
    //   <AlertDialogTrigger asChild>
    //     <Button>
    //       <UserPlus className="mr-2 h-4 w-4" />
    //       Thêm tài khoản
    //     </Button>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Thêm tài khoản</AlertDialogTitle>
    //       <AlertDialogDescription></AlertDialogDescription>
    //     </AlertDialogHeader>

    //     {/* begin form */}
    //     {/* FieldGroup to nhất bọc tất cả > FieldSet bọc một bộ thông tin gồm các trường không cần nhập liệu FieldLegend,FielDescription > FiledGroup bọc bộ thông tin mà có thể nhập dữ liệu như ô Input,..*/}

    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Hủy</AlertDialogCancel>
    //       <AlertDialogAction asChild></AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
  );
}
