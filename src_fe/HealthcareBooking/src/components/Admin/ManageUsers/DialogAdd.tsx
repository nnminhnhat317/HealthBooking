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
} from "@/components/ui/alert-dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button"

export function DialogAdd() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }
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
        <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Thông tin tài khoản</FieldLegend>
                
              </FieldSet>
            </FieldGroup>
        </form>
        {/* end form */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
