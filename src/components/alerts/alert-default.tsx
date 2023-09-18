import { Info } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AlertDefaultType = {
  title: string;
  description: string;
}

export function AlertDefault({
  title = 'Information',
  description = 'Please check your email for magic OTP link.'
}: AlertDefaultType) {
  return (
    <Alert variant="default">
      <Info className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}
