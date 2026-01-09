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
import type { BookingFormData, BookingAppointmentRequest } from "@/types/booking";
import { bookingFormSchema } from "@/types/booking";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { addBookingApi } from "@/api/booking";
interface FormBookingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // selectedData?: any; // Truyền thông tin bác sĩ/khung giờ nếu cần
  // dữ liệu nhận từ component cha
  dataSchedule: {
    doctorId: number;
    date: string;    // yyyy-mm-dd
    timeType: string; // T1, T2...
  } | undefined; // Có thể undefined nếu dữ liệu nhận từ cha không thành công
}
export function FormBooking({ open, onOpenChange, dataSchedule }: FormBookingProps) {
  // const [open, setOpen] = useState(false);
  //useForm
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      email: "exam@gmail.com",
    //   password: "123456",
      firstName: "Nhat",
      lastName: "Minh",
    //   address: "",
    //   gender: "",
    //   roleId: "",
    //   positionId: "",
      phoneNumber: "",
    //   image: "",
    },
  });

  const onSubmit: SubmitHandler<BookingFormData> = async (
    data: z.infer<typeof bookingFormSchema>
  ) => {
    // KIỂM TRA QUAN TRỌNG: Đảm bảo có dữ liệu từ component cha trước khi gửi
    if (!dataSchedule) {
      toast.error("Thiếu dữ liệu được truyền từ component cha SectionInfo");
      return;
    }
    // --- KẾT HỢP DỮ LIỆU TẠI ĐÂY ---
    // Tạo object cuối cùng đúng chuẩn API backend yêu cầu
    const finalPayload = {
      ...data,// Lấy toàn bộ dữ liệu form (email, firstName...)
      doctorId: dataSchedule.doctorId,
      date: dataSchedule.date,
      timeType: dataSchedule.timeType
    };

    try {
      await addBookingApi(finalPayload);
      // setOpen(false);
      onOpenChange(false); // Đóng form khi thành công
      // toast.success("Đặt lịch thành công");
    } catch (error) {
      console.log("Lỗi API submit form tại component FormBooking", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </DialogTrigger> */}
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Thông tin đặt lịch khám</DialogTitle>
          {dataSchedule && (
            <DialogDescription>
              Khung giờ: {dataSchedule.timeType}
            </DialogDescription>
          )}
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

                    {/* <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="password">Password</FieldLabel> */}
                          {/* <FieldDescription>
                            Must be at least 6 characters long.
                          </FieldDescription> */}
                          {/* <Input
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
                    /> */}

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

                    {/* <Controller
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
                    />*/}
                  </div> 

                  <div className=" basis-1/2">
                    {/* <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
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
                            
                          </FieldDescription>
                        </Field>
                      )}
                    /> */}

                    {/* <Controller
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
                            
                          </FieldDescription>
                        </Field>
                      )}
                    /> */}

                    {/* <Controller
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
                            
                          </FieldDescription>
                        </Field>
                      )}
                    /> */}

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
